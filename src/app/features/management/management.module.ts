import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management.routing';
import { UpdateShowComponent } from './show/components';

@NgModule({
  declarations: [
    ManagementComponent,
    UpdateShowComponent
  ],
  imports: [
    CoreModule,
    ManagementRoutingModule
  ],
  exports: [
    ManagementComponent
  ]
})
export class ManagementModule { }
