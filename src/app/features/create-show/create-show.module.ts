import {NgModule} from '@angular/core';

import {CreateShowComponent} from '.';
import {CoreModule} from 'src/app/core';
import {CreateShowRoutingModule} from './create-show.routing';

@NgModule({
  declarations: [
    CreateShowComponent
  ],
  imports: [
    CoreModule,
    CreateShowRoutingModule
  ],
  exports: [
    CreateShowComponent
  ]
})
export class CreateShowModule { }
