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
import { NotarySideBarComponent } from './components/notary-side-bar/notary-side-bar.component';
import { SurveyorSideBarComponent } from './components/surveyor-side-bar/surveyor-side-bar.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';

@NgModule({
  declarations: [
    HomeNavbarComponent,
    HomeFooterComponent,
    Page404Component,
    LoadingPageComponent,
    SideBarComponent,
    SysNavbarComponent,
    SysFooterComponent,
    NotarySideBarComponent,
    SurveyorSideBarComponent,
    AlertBoxComponent
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
    SysFooterComponent,
    NotarySideBarComponent,
    SurveyorSideBarComponent,
    AlertBoxComponent
  ]
})
export class SharedModule { }
