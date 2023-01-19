import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core';
import { ViewShowRoutingModule } from './view-show.routing';

import {
  ViewShowComponent,
  AddCommentComponent,
  ViewCommentsComponent
} from '.';

@NgModule({
  declarations: [
    ViewShowComponent,    
    ViewCommentsComponent,
    AddCommentComponent,
  ],
  imports: [
    CoreModule,
    ViewShowRoutingModule
  ],
  exports: [
    ViewShowComponent
  ]
})
export class ViewShowModule { }
