import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) { }

  currentUser: UserInfo;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false)
  });

  ngOnInit() {
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
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      };
      this.router.navigate(["loading"]);
    } else {
      alert("Login credentials are not provided");
    }
  }

}
