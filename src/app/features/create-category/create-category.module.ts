import { NgModule } from '@angular/core';

import { CreateCategoryComponent } from '.';
import { CoreModule } from 'src/app/core';
import { CreateCategoryRoutingModule } from './create-category.routing';

@NgModule({
  declarations: [
    CreateCategoryComponent
  ],
  imports: [
    CoreModule,
    CreateCategoryRoutingModule
  ],
  exports: [
    CreateCategoryComponent
  ]
})
export class CreateCategoryModule { }
