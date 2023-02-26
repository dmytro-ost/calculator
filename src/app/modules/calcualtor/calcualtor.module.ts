import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcualtorComponent } from './calcualtor/calcualtor.component';
import { CalcualtorRoutingModule } from './calculator-routing.module';



@NgModule({
  declarations: [
    CalcualtorComponent
  ],
  imports: [
    CommonModule,
    CalcualtorRoutingModule
  ]
})
export class CalcualtorModule { }
