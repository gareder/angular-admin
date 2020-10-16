import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { PagesComponent } from './pages.component';
// import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintances/users/users.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
    AccountSettingComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // AppRoutingModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
    AccountSettingComponent
  ]
})
export class PagesModule { }
