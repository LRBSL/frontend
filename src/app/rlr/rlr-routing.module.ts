import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotaryRegistrationComponent } from './pages/notary-registration/notary-registration.component';
import { OngoingTransactionsComponent } from './pages/ongoing-transactions/ongoing-transactions.component';
import { SearchInformationComponent } from './pages/search-information/search-information.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "sys" },
  { path: "sys", component: LayoutComponent, children: [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "dashboard", component: DashboardComponent },
    { path: "notary-registration", component: NotaryRegistrationComponent },
    { path: "ongoing-transactions", component: OngoingTransactionsComponent },
    { path: "search-information", component: SearchInformationComponent },
    { path: "profile", component: ProfileComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RlrRoutingModule { }
