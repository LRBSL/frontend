import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "lrbsl" },
  { path: "lrbsl", component: LayoutComponent, children: [
    { path: "", component: HomeComponent },
    { path: "contact", component: ContactComponent}
  ]},
  { path: "lrbsl-login/rlr", component: LoginComponent },
  { path: "lrbsl-login/notary", component: LoginComponent },
  { path: "lrbsl-login/surveyor", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
