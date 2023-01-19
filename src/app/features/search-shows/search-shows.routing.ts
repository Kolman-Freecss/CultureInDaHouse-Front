import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchShowsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: SearchShowsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchShowsRoutingModule { }
