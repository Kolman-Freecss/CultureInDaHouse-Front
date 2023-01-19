import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBusinessComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: SearchBusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchBusinessRouting { }
