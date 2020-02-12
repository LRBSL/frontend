import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-notary-registration',
  templateUrl: './notary-registration.component.html',
  styleUrls: ['./notary-registration.component.css']
})
export class NotaryRegistrationComponent implements OnInit {

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) { }

  alert_type: string;
  alert_content: string;

  notaryRegisterForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required]),
    regId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit() {
  }

  submitRegister() {
    try {
      if (this.notaryRegisterForm.valid) {
        this.authService.registerNotary({
          fname: this.notaryRegisterForm.controls.fname.value,
          lname: this.notaryRegisterForm.controls.lname.value,
          nic: this.notaryRegisterForm.controls.nic.value,
          regId: this.notaryRegisterForm.controls.regId.value,
          email: this.notaryRegisterForm.controls.email.value
        }).subscribe((result: any) => {
          console.log(result.status)
          this.alert_type = "success";
          this.alert_content = "Notary successfully registered";
          this.document.getElementById("openAlertBoxButton").click();
        }, (err) => {
          this.alert_type = "error";
          this.alert_content = "Notary registration failed";
          this.document.getElementById("openAlertBoxButton").click();
          throw new Error("Notary registration failed");
        });
      } else {
        throw new Error("Form validation failed. Check again");
      }
    } catch (ex) {
      this.alert_type = "error";
      this.alert_content = ex;
      this.document.getElementById("openAlertBoxButton").click();
    }
  }

}
