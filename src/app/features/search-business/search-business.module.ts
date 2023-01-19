import {NgModule} from '@angular/core';
import {SearchBusinessComponent} from './components';
import {CoreModule} from "../../core";
import {SearchBusinessRouting} from "./search-business.routing";


@NgModule({
  declarations: [
    SearchBusinessComponent
  ],
  imports: [
    CoreModule,
    SearchBusinessRouting
  ],
  exports: [
    SearchBusinessComponent
  ]
})
export class SearchBusinessModule {
}
