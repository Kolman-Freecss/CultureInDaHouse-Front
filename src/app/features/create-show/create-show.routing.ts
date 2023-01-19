import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateShowComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: CreateShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateShowRoutingModule { }
