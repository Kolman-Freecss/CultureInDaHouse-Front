import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateShowComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: UpdateShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateShowRoutingModule { }
