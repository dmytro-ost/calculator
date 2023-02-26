import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './modules/container/container.component';

const routes: Routes = [{
  path: '',
  component: ContainerComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      loadChildren: () => import('./modules/calcualtor/calcualtor.module').then(m => m.CalcualtorModule)
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
