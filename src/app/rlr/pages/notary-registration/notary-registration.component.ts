import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-notary-registration',
  templateUrl: './notary-registration.component.html',
  styleUrls: ['./notary-registration.component.css']
})
export class NotaryRegistrationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  notaryRegisterForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    nic: new FormControl(''),
    regId: new FormControl(''),
    email: new FormControl('')
  }); 

  ngOnInit() {
  }

  submitRegister() {
    this.authService.registerNotary({
      fname: this.notaryRegisterForm.controls.fname.value,
      lname: this.notaryRegisterForm.controls.lname.value,
      nic: this.notaryRegisterForm.controls.nic.value,
      regId: this.notaryRegisterForm.controls.regId.value,
      email: this.notaryRegisterForm.controls.email.value
    }).subscribe((result: any) => {
      console.log(result);
    });
  }

}
