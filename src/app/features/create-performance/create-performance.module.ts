import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core';
import { CreatePerformanceComponent } from './components';
import { CreatePerformanceRoutingModule } from './create-performance.routing';

@NgModule({
  declarations: [
    CreatePerformanceComponent
  ],
  imports: [
    CoreModule,
    CreatePerformanceRoutingModule
  ],
  exports: [
    CreatePerformanceComponent
  ]
})
export class CreatePerformanceModule { }
