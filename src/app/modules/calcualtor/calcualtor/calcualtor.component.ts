import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, of } from 'rxjs';
import { DEFAULT } from 'src/app/core/constants/default-values';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Unsubscribe } from 'src/app/shared/decorators/unsubscribe.decorator';
import { untilDestroyed } from 'src/app/shared/helpers/until-destoyed.func';

@Component({
  selector: 'app-calcualtor',
  templateUrl: './calcualtor.component.html',
  styleUrls: ['./calcualtor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Unsubscribe()
export class CalcualtorComponent implements OnInit {

  formCalculator!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly calculatorService: CalculatorService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formCalculator = this.formBuilder.group({
      storageCtrl: [0],
      transferCtrl: [0],
    });

    combineLatest([
      this.formCalculator.get('storageCtrl')?.valueChanges || of(0),
      this.formCalculator.get('transferCtrl')?.valueChanges || of(0)
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([left, right]) => {
        const old = this.calculatorService.store.getValue();
        this.calculatorService.store.next({
          ...old,
          sliderStorage: left,
          sliderTransfer: right,
        });
      });

    this.setDefaultValues();
  }

  private setDefaultValues() {
    this.formCalculator.get('storageCtrl')?.setValue(DEFAULT.sliderStorage);
    this.formCalculator.get('transferCtrl')?.setValue(DEFAULT.sliderTransfer);
  }

}
