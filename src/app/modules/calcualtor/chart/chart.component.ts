import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Accessibility from 'highcharts/modules/Accessibility';
import { CHART } from 'src/app/core/constants/localstorage';
import { getRadioButtonsTemplate } from '../radio-button/radio-button.factory';
import { COLOR, PROVIDER, PROVIDERS_COLOROS } from 'src/app/core/constants/providers';
import { CalculatorService } from 'src/app/services/calculator.service';
import { DEFAULT } from 'src/app/core/constants/default-values';
import { CalculatorStore } from 'src/app/models/calculator-store.model';
import { auditTime, Subscription } from 'rxjs';
import { ChartData } from 'src/app/models/chart-data.model';
import { Unsubscribe } from 'src/app/shared/decorators/unsubscribe.decorator';
import { untilDestroyed } from 'src/app/shared/helpers/until-destoyed.func';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class ChartComponent implements OnInit, OnDestroy {

  chart!: Highcharts.Chart;

  constructor(private readonly calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.initChart();
    this.subscribeToLocalStorage();
    this.subscribeToStore();
  }

  ngOnDestroy(): void {
    this.unSubscribeFromLocalStorage();
  }

  private initChart() {
    Accessibility(Highcharts);
    Highcharts.AST.allowedTags.push('input', 'label');
    Highcharts.AST.allowedAttributes.push('name', 'value', 'for', 'checked', 'onclick', 'alt');

    localStorage.removeItem(CHART);
    localStorage.setItem(CHART, JSON.stringify({ 'device': DEFAULT.device, 'mode': DEFAULT.mode }));

    this.chart = Highcharts.chart('container', {
      title: { text: '' },
      yAxis: { visible: false },
      tooltip: {
        enabled: false
      },
      xAxis: {
        categories: [PROVIDER.BACKBLAZE, PROVIDER.BUNNY, PROVIDER.SCALEWAY, PROVIDER.VULTR],
        labels: {
          formatter: function () {
            let xLabelHtml = `<img src="./assets/${this.value}-icon.png" alt="${this.value}" 
                style="width: 40px; height: 40px; display: block; margin: 0 auto;">
                <p style="text-align: center; margin: 0">${this.value}</p>
              `;

            if (this.value === PROVIDER.BUNNY) {
              xLabelHtml += getRadioButtonsTemplate('device', 'hdd', 'HDD', DEFAULT.device === 'hdd');
              xLabelHtml += getRadioButtonsTemplate('device', 'ssd', 'SSD', DEFAULT.device === 'ssd');
            }

            if (this.value === PROVIDER.SCALEWAY) {
              xLabelHtml += getRadioButtonsTemplate('mode', 'multy', 'Multy', DEFAULT.mode === 'multy');
              xLabelHtml += getRadioButtonsTemplate('mode', 'single', 'Single', DEFAULT.mode === 'single');
            }

            return xLabelHtml;
          },
          useHTML: true,
        }
      },
      series: [{
        type: 'column',
        name: 'Total',
        colorByPoint: false,
        showInLegend: false,
        dataLabels: {
          enabled: true,
          format: '{y}$',
          style: {
            fontSize: '16px'
          }
        }
      }],
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 0
            },
            chartOptions: {
              chart: {
                type: 'bar'
              },
            }
          }, {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              chart: {
                type: 'column'
              },
            }
          },
        ]
      },
      chart: {
        animation: {
          duration: 200
        },
      },
      credits: {
        enabled: false
      }
    });
  }

  private subscribeToStore() {
    this.calculatorService.store
      .pipe(
        untilDestroyed(this),
        auditTime(50)
      )
      .subscribe((store: CalculatorStore) => {
        this.updateChart(this.prepeareData(store));
      });
  }

  private updateChart(data: ChartData[]) {
    this.chart.series[0].setData(data);
  }

  private subscribeToLocalStorage(): void {
    window.addEventListener('storage_changed', this.storageEventListener.bind(this));
  }

  private unSubscribeFromLocalStorage(): void {
    window.removeEventListener('storage_changed', this.storageEventListener.bind(this));
    localStorage.removeItem(CHART);
  }

  private storageEventListener() {
    const rbStorage = JSON.parse(localStorage.getItem(CHART) || '{}');
    const store = this.calculatorService.store.getValue();
    this.calculatorService.store.next({
      ...store,
      device: rbStorage.device,
      mode: rbStorage.mode
    })
  }

  private prepeareData(store: CalculatorStore): ChartData[] {
    let data = [];

    // PROVIDER.BACKBLAZE:
    let result = store.sliderStorage * 0.005 + store.sliderTransfer * 0.01;
    result = this.formatPrice(result);
    data.push({ name: PROVIDER.BACKBLAZE, y: result >= 7 ? result : 7 });

    // PROVIDER.BUNNY:
    result = store.sliderStorage * (store.device === 'hdd' ? 0.01 : 0.02) + store.sliderTransfer * 0.01;
    result = this.formatPrice(result);
    data.push({ name: PROVIDER.BUNNY, y: result <= 10 ? result : 10 });

    // PROVIDER.SCALEWAY:
    result = (store.sliderStorage - 75) * (store.mode === 'multy' && store.sliderTransfer >= 75 ? 0.06 : 0) +
      (store.sliderStorage - 75) * (store.mode === 'single' && store.sliderTransfer >= 75 ? 0.03 : 0) +
      (store.sliderTransfer - 75) * (store.sliderStorage <= 75 ? 0 : 0.02);
    result = this.formatPrice(result);
    data.push({ name: PROVIDER.SCALEWAY, y: result });

    // PROVIDER.VULTR:
    result = store.sliderStorage * 0.01 + store.sliderTransfer * 0.01;
    result = this.formatPrice(result);
    data.push({ name: PROVIDER.VULTR, y: result >= 5 ? result : 5 });


    let minValue = Math.min(...data.map(provider => provider.y));

    data = data.reduce((result, current) => {
      const provider = current.y === minValue ?
        ({ y: current.y, color: PROVIDERS_COLOROS[current.name] }) :
        ({ y: current.y, color: COLOR.NO_COLOR });
      result.push(provider);
      return result;
    }, [] as ChartData[]);

    return data;
  }

  private formatPrice(price: number): number {
    return Math.abs(+Number(price.toFixed(2)).toLocaleString('en-US'));
  }

}
