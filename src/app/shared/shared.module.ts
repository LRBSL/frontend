import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';



@NgModule({
  declarations: [HomeNavbarComponent, HomeFooterComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeNavbarComponent, HomeFooterComponent]
})
export class SharedModule { }
