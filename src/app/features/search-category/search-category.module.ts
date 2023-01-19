import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCategoryComponent } from './components/search-category.component';
import {SearchCategoryRouting} from "./search-category.routing";
import {CoreModule} from "../../core";



@NgModule({
  declarations: [
    SearchCategoryComponent
  ],
  imports: [
    CommonModule,
    SearchCategoryRouting,
    CoreModule
  ],
  exports: [
    SearchCategoryComponent
  ]
})
export class SearchCategoryModule { }
