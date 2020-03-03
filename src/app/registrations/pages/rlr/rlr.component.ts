import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rlr',
  templateUrl: './rlr.component.html',
  styleUrls: ['./rlr.component.css']
})
export class RlrComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) { }

  sub1: Subscription;

  alert_type: string;
  alert_content: string;

  rlrRegisterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    regId: new FormControl('', [Validators.required]),
    publicName: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required]),
    postalAddress: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }

  submitRegister() {
    if (this.rlrRegisterForm.valid) {
      this.sub1 = this.authService.registerRLR({
        email: this.rlrRegisterForm.controls.email.value,
        password: this.rlrRegisterForm.controls.email.value,
        registeredId: this.rlrRegisterForm.controls.regId.value,
        publicName: this.rlrRegisterForm.controls.publicName.value,
        contactNo: this.rlrRegisterForm.controls.contactNo.value,
        postalAddress: this.rlrRegisterForm.controls.postalAddress.value
      }).subscribe((res) => {
        this.alert_type = "success";
        this.alert_content = "RLR user successfully registered";
        this.document.getElementById("openAlertBoxButton").click();
        this.rlrRegisterForm.reset();
      }, (err) => {
        this.alert_type = "error";
        this.alert_content = "RLR user registration terminated";
        this.document.getElementById("openAlertBoxButton").click();
      })
    } else {
      this.alert_type = "error";
      this.alert_content = "Form validation failed";
      this.document.getElementById("openAlertBoxButton").click();
    }
  }

}
