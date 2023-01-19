import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateBusinessComponent} from "./components/create-business.component";

const routes: Routes = [
  {
    path: '',
    component: CreateBusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBusinessRouting { }
