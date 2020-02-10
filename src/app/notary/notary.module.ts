import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaryRoutingModule } from './notary-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandRegistrationComponent } from './pages/land-registration/land-registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchInformationComponent } from './pages/search-information/search-information.component';


@NgModule({
  declarations: [LayoutComponent, DashboardComponent, LandRegistrationComponent, ProfileComponent, SearchInformationComponent],
  imports: [
    CommonModule,
    NotaryRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NotaryModule { }
