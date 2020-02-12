import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

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
export class LoginComponent implements OnInit, OnDestroy {

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
  private subsLoginUserBackend: Subscription;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    rememberMe: new FormControl(false)
  });

  ngOnInit() {
    this.commonService.loadStyle(this.document, 'bootstrap-theme', "assets/bootstrap/css/bootstrap-home.min.css");
    this.getUserInfoByURL();
  }

  ngOnDestroy() {
    this.subsLoginUserBackend.unsubscribe();
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

  async submitLogin() {
    try {
      if (this.loginForm.valid) {
        this.authService.currentAuthUser = {
          id: this.currentUser.userId,
          type: this.currentUser.userType,
          email: this.loginForm.controls.email.value,
          password: this.loginForm.controls.password.value
        };
        await this.getCurrentAuthUserData().then((authUser: any) => {
          if (authUser.type != this.currentUser.userTypeForBack) {
            throw new Error("User  credentials are incorrect");
          }
          this.authService.currentUser = {
            id: authUser.id,
            email: authUser.email,
            type: authUser.type,
            regId: authUser.regId,
            createdAt: authUser.createdAt,
            updatedAt: authUser.updatedAt,
            firstName: authUser.firstName,
            lastName:authUser.lastName,
            nic: authUser.nic,
            contact:authUser.contact,
            postalAddress: authUser.postalAddress,
            lastLogin: authUser.lastLogin,
            isActive:authUser.isActive,
          };
          this.router.navigate(["loading"]);
        }).catch((error) => {
          throw new Error("User  credentials are incorrect");
        });
      } else {
        if (!this.loginForm.controls.email.value) {
          throw new Error("Email is not provided");
        } else if (!this.loginForm.controls.password.value) {
          throw new Error("Password is not provided");
        } else if (!this.loginForm.controls.email.value && !this.loginForm.controls.password.value) {
          throw new Error("Login credentials are not provided");
        }
      }
    } catch (ex) {
      this.alert_type = "error";
      this.alert_content = ex;
      this.document.getElementById("openAlertBoxButton").click();
    }
  }

  getCurrentAuthUserData() {
    return new Promise<object>((resolve, reject) => {
      this.subsLoginUserBackend = this.authService.loginUserBackend().subscribe((result: any) => {
        if (result.success && result.data != null) {
          resolve(result.data);
        } else {
          reject(result.error);
        }
      }, (error) => { reject(error) });
    });
  }

}
