import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RlrComponent } from './pages/rlr/rlr.component';
import { NotaryComponent } from './pages/notary/notary.component';
import { SurveyorComponent } from './pages/surveyor/surveyor.component';
import { LayoutComponent } from './layout/layout.component';
import { RegistrationsRoutingModule } from './registrations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RlrComponent, NotaryComponent, SurveyorComponent, LayoutComponent],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RegistrationsModule { }
