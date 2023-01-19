import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePerformanceComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: CreatePerformanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePerformanceRoutingModule { }
