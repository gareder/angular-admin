import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const routes: Routes = [

  { path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    // Lazy load
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./child-routes.module').then(module => module.ChildRoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
