import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core';
import { SearchShowsComponent } from '.';
import { SearchShowsRoutingModule } from './search-shows.routing';

@NgModule({
  declarations: [
    SearchShowsComponent
  ],
  imports: [
    CoreModule,
    SearchShowsRoutingModule
  ],
  exports: [
    SearchShowsComponent
  ]
})
export class SearchShowsModule { }
