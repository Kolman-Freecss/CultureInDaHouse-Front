import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewShowComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ViewShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewShowRoutingModule { }
