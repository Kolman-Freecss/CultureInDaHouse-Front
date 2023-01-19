import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'crear-show',
    loadChildren: () => import('./features/create-show/create-show.module').then(m => m.CreateShowModule),
  },
  {
    path: 'update-show',
    loadChildren: () => import('./features/update-show/update-show.module').then(m => m.UpdateShowModule),
  },
  {
    path: 'view-show',
    loadChildren: () => import('./features/view-show/view-show.module').then(m => m.ViewShowModule),
  },
  {
    path: 'crear-performance',
    loadChildren: () => import('./features/create-performance/create-performance.module').then(m => m.CreatePerformanceModule),
  },
  {
    path: 'crear-category',
    loadChildren: () => import('./features/create-category/create-category.module').then(m => m.CreateCategoryModule),
  },
  {
    path: 'search-shows',
    loadChildren: () => import('./features/search-shows/search-shows.module').then(m => m.SearchShowsModule),
  },
  {
    path: 'crear-empresa',
    loadChildren: () => import('./features/create-business/create-business.module').then(m => m.CreateBusinessModule),
  },
  {
    path: 'search-business',
    loadChildren: () => import('./features/search-business/search-business.module').then(m => m.SearchBusinessModule),
  },
  {
    path: 'search-category',
    loadChildren: () => import('./features/search-category/search-category.module').then(m => m.SearchCategoryModule),
  },

  // Solo visible para ROL Administrador/Gestor
  {
    path: 'management',
    loadChildren: () => import('./features/management/management.module').then(m => m.ManagementModule),
  },
  // {
  //   path: 'no-autorizado',
  //   component: P401Component,
  // },
  // {
  //   path: '**',
  //   component: P404Component,
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
