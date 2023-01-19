import {NgModule} from '@angular/core';
import {CoreModule} from 'src/app/core';
import {CreateBusinessComponent} from "./components/create-business.component";
import {CreateBusinessRouting} from "./create-business.routing";

@NgModule({
  declarations: [
    CreateBusinessComponent
  ],
  imports: [
    CoreModule,
    CreateBusinessRouting
  ],
  exports: [
    CreateBusinessComponent
  ]
})
export class CreateBusinessModule { }
