import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlanRegistrationComponent } from './pages/plan-registration/plan-registration.component';
import { SearchInformationComponent } from './pages/search-information/search-information.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "sys" },
  { path: "sys", component: LayoutComponent, children: [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "dashboard", component: DashboardComponent },
    { path: "plan-registration", component: PlanRegistrationComponent },
    { path: "search-information", component: SearchInformationComponent },
    { path: "profile", component: ProfileComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyorRoutingModule { }
