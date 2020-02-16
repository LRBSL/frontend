import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DOCUMENT } from '@angular/common';

interface UserInfo {
  userId: number,
  userType: string,
  userTypeForBack?: string,
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
      userTypeForBack: "rlr",
      userDescription: "manage land transactions based on region, manage notary employees, etc"
    },
    {
      userId: 1,
      userType: "Notary",
      userTypeForBack: "notary",
      userDescription: "execute land transactions, check lands information, etc"
    },
    {
      userId: 2,
      userType: "Surveyor",
      userTypeForBack: "surveyor",
      userDescription: "verify plan information, check lands information, etc"
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: Document) { }

  currentUser: UserInfo;

  alert_type: string;
  alert_content: string;

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
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      };
      this.router.navigate(["loading"]);
    } else {
      this.alert_type = "error";
      this.alert_content = "Form input validation failed. Check and try again.";
      this.document.getElementById("openAlertBoxButton").click();
    }
  }


}
