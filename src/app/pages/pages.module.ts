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
import { HospitalsComponent } from './maintances/hospitals/hospitals.component';
import { MedicsComponent } from './maintances/medics/medics.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicComponent } from './maintances/medics/medic.component';
import { SearchComponent } from './search/search.component';



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
    UsersComponent,
    HospitalsComponent,
    MedicsComponent,
    MedicComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // AppRoutingModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
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
