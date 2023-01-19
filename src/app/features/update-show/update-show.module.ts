import {NgModule} from '@angular/core';

import {UpdateShowComponent} from '.';
import {CoreModule} from 'src/app/core';
import {UpdateShowRoutingModule} from './update-show.routing';

@NgModule({
  declarations: [
    UpdateShowComponent
  ],
  imports: [
    CoreModule,
    UpdateShowRoutingModule
  ],
  exports: [
    UpdateShowComponent
  ]
})
export class UpdateShowModule { }
