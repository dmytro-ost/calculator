import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectionStrategy, Component,  forwardRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-input-scale',
  templateUrl: './input-scale.component.html',
  styleUrls: ['./input-scale.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputScaleComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputScaleComponent implements ControlValueAccessor {

  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() unit = '';
  @Input() name = '';
  @Input() disabled = false;

  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  value = 0;

  private onChange = (value: number) => { };
  private onTouched = () => { };

  constructor() { }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  inputChanged(val: number) {
    this.onChange(val);
  }

}
