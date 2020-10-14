import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [

  { path: 'dashboard', component: PagesComponent, canActivate: [ AuthGuard ], children: [
    { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
    { path: 'account-settings', component: AccountSettingComponent, data: { title: 'Account Settings' } },
    { path: 'chart1', component: Chart1Component, data: { title: 'Charts' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'User Profile' } },
    { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
    { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
    { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
