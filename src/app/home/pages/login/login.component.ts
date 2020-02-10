import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DOCUMENT } from '@angular/common';

interface UserInfo {
  userId: number,
  userType: string,
  userDescription?: string,
  username?: string,
  userpassword?: string
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInfo: UserInfo[] = [
    {
      userId: 0,
      userType: "Regional Land Registry",
      userDescription: "manage land transactions based on region, manage notary employees, etc"
    },
    {
      userId: 1,
      userType: "Notary",
      userDescription: "execute land transactions, check lands information, etc"
    },
    {
      userId: 2,
      userType: "Surveyor",
      userDescription: "verify plan information, check lands information, etc"
    },
  ];

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: Document) { }

  currentUser: UserInfo;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    rememberMe: new FormControl(false)
  });

  ngOnInit() {
    this.commonService.loadStyle(this.document, 'bootstrap-theme', "assets/bootstrap/css/bootstrap-home.min.css");
    this.getUserInfoByURL();
  }

  getUserInfoByURL() {
    let route: string = this.router.url.split(RegExp("/|#"))[2];
    if (route == "rlr") {
      this.currentUser = this.userInfo[0];
    } else if (route == "notary") {
      this.currentUser = this.userInfo[1];
    } else if (route == "surveyor") {
      this.currentUser = this.userInfo[2];
    }
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.authService.currentAuthUser = {
        id: this.currentUser.userId,
        type: this.currentUser.userType,
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      };
      this.router.navigate(["loading"]);
    } else {
      if(!this.loginForm.controls.email.value){
        alert("Email is not provided");
      } else if(!this.loginForm.controls.password.value){
        alert("Password is not provided");
      } else if(!this.loginForm.controls.email.value && !this.loginForm.controls.password.value) {
        alert("Login credentials are not provided");
      } else {
        alert("Login credentials are incorrect");
      }
    }
  }

}
