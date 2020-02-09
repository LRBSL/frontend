import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RlrRoutingModule } from './rlr-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotaryRegistrationComponent } from './pages/notary-registration/notary-registration.component';
import { OngoingTransactionsComponent } from './pages/ongoing-transactions/ongoing-transactions.component';
import { SearchInformationComponent } from './pages/search-information/search-information.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [DashboardComponent, NotaryRegistrationComponent, OngoingTransactionsComponent, SearchInformationComponent, ProfileComponent, LayoutComponent],
  imports: [
    CommonModule,
    RlrRoutingModule
  ]
})
export class RlrModule { }
