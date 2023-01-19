import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchCategoryComponent} from "./components/search-category.component";

const routes: Routes = [
  {
    path: '',
    component: SearchCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCategoryRouting { }
