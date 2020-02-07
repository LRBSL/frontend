import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { RouterModule } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';



@NgModule({
  declarations: [HomeNavbarComponent, HomeFooterComponent, Page404Component],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [HomeNavbarComponent, HomeFooterComponent, Page404Component]
})
export class SharedModule { }
