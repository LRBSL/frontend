import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "lrbsl" },
  { path: "lrbsl", component: LayoutComponent, children: [
    { path: "", component: HomeComponent },
    { path: "contact", component: ContactComponent}
  ], runGuardsAndResolvers: "always"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
