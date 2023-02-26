import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcualtorComponent } from './calcualtor/calcualtor.component';
import { CalcualtorRoutingModule } from './calculator-routing.module';
import { InputScaleComponent } from './input-scale/input-scale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CalcualtorComponent,
    InputScaleComponent
  ],
  imports: [
    CommonModule,
    CalcualtorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CalcualtorModule { }
