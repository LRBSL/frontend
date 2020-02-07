import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './shared/components/page404/page404.component';
import { LoadingPageComponent } from './shared/components/loading-page/loading-page.component';


const routes: Routes = [
  { path: "", loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: "loading", component: LoadingPageComponent },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
