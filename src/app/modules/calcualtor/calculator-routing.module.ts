import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcualtorComponent } from './calcualtor/calcualtor.component';


const routes: Routes = [
  {
    path: '',
    component: CalcualtorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalcualtorRoutingModule { }
