import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyorRoutingModule } from './surveyor-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlanRegistrationComponent } from './pages/plan-registration/plan-registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchInformationComponent } from './pages/search-information/search-information.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LayoutComponent, DashboardComponent, PlanRegistrationComponent, ProfileComponent, SearchInformationComponent],
  imports: [
    CommonModule,
    SurveyorRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SurveyorModule { }
