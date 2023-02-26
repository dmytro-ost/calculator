import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calcualtor',
  templateUrl: './calcualtor.component.html',
  styleUrls: ['./calcualtor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcualtorComponent implements OnInit {

  formCalculator!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formCalculator = this.formBuilder.group({
      storageCtrl: [0],
      transferCtrl: [0],
    });

    this.formCalculator.get('storageCtrl')?.valueChanges
      .subscribe(a => console.log('Stor: ', a));

    this.formCalculator.get('transferCtrl')?.valueChanges
      .subscribe(a => console.log('Transf: ', a));

    this.setDefaultValues();
  }

  private setDefaultValues() {
    this.formCalculator.get('storageCtrl')?.setValue(100);
    this.formCalculator.get('transferCtrl')?.setValue(400);
  }

}
