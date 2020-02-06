import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';



@NgModule({
  declarations: [HomeNavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeNavbarComponent]
})
export class SharedModule { }
