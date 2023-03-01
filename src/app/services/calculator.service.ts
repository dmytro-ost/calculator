import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT } from '../core/constants/default-values';
import { CalculatorStore } from '../models/calculator-store.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private initialValue: CalculatorStore = {
    sliderStorage: DEFAULT.sliderStorage,
    sliderTransfer: DEFAULT.sliderTransfer,
    device: DEFAULT.device,
    mode: DEFAULT.mode,
  }

  store = new BehaviorSubject<CalculatorStore>(this.initialValue);

}
