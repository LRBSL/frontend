import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { RouterModule } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { SideBarComponent } from './components/rlr-side-bar/rlr-side-bar.component';
import { SysNavbarComponent } from './components/sys-navbar/sys-navbar.component';
import { SysFooterComponent } from './components/sys-footer/sys-footer.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeNavbarComponent,
    HomeFooterComponent,
    Page404Component,
    LoadingPageComponent,
    SideBarComponent,
    SysNavbarComponent,
    SysFooterComponent
  ],
  imports: [
    CommonModule, RouterModule, HttpClientModule
  ],
  exports: [
    HomeNavbarComponent,
    HomeFooterComponent,
    Page404Component,
    LoadingPageComponent,
    SideBarComponent,
    SysNavbarComponent,
    SysFooterComponent
  ]
})
export class SharedModule { }
