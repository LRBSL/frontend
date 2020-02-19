import { Injectable } from '@angular/core';
import { HttpResolverService } from './http-resolver.service';
import { BackendURLS } from '../utils/backend-urls.enum';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotaryRegister } from '../models/notary-register';

export interface AuthUser {
  type?: string,
  email?: string,
  password?: string
}

export interface User {
  id?: string,
  type?: string,
  email?: string,
  password?: string,
  registeredId?: string,
  createdAt?: string,
  updatedAt?: string,
  firstName?: string,
  lastName?: string,
  publicName?: string,
  nic?: string,
  contactNo?: string,
  postalAddress?: string,
  lastLogin?: string,
  isActive?: boolean,
  registeredAt?: string
}

export interface RegNotary {
  fname: string,
  lname: string,
  nic: string,
  regId: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _currentAuthUser: AuthUser;
  _currentUser: User;

  constructor(
    private httpResolverService: HttpResolverService,
    private cookieService: CookieService,
    private router: Router) { }

  public get currentAuthUser(): AuthUser {
    return this._currentAuthUser;
  }

  public set currentAuthUser(v: AuthUser) {
    this._currentAuthUser = v;
  }

  public get currentUser(): User {
    return this._currentUser;
  }

  public set currentUser(v: User) {
    this._currentUser = v;
  }

  public loginUserBackend() {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.user_login_backend, { email: this.currentAuthUser.email, password: this.currentAuthUser.password });
  }

  public loginUserBlockchain() {
    return new Promise<object>((resolve, reject) => {
      const obsv1 = this.httpResolverService.realizarHttpPost(
        BackendURLS.user_login_blockchain_identity_name, {});
      const obsv2 = this.httpResolverService.realizarHttpPost(
        BackendURLS.user_login_blockchain_identity_org, {});
      const obsv3 = this.httpResolverService.realizarHttpPost(
        BackendURLS.user_login_blockchain, {});

      this.setBlockchainLoginData(obsv1).then(() => {
        this.setBlockchainLoginData(obsv2).then(() => {
          this.setBlockchainLoginData(obsv3).then(() => {
            resolve();
          }).catch((error) => reject(error));
        }).catch((error) => reject(error));
      }).catch((error) => reject(error));
    });
  }

  public registerNotary(notary: RegNotary) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.notary_register, { notary: notary });
  }

  public async logout() {
    this.cookieService.deleteAll();
    await this.delay(600);
  }

  public checkCurrentUserExist(type: string) {
    if (this.currentUser == null || this.currentUser.type != type) {
      this.router.navigate(["/lrbsl"]);
    }
  }

  public getUserByNic(nic: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.user_get_by_nic, { nic: nic });
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private setBlockchainLoginData(loginUserBlockchain: Observable<Object>) {
    let obsv = loginUserBlockchain;
    return new Promise<object>((resolve, reject) => {
      obsv.subscribe((result: any) => {
        if (result.success) {
          resolve();
        } else {
          reject(result.error);
        }
      }, (error) => {
        reject(error);
      });
    });
  }

  // --------------------------------------------------------------
  public registerNotaryUser(notary: NotaryRegister) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.user_notary_register, notary);
  }

  public login(email: string, password: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.user_login, { email: email, password: password });
  }

  public getRLRUserInfo(id: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.user_getinfo_rlr, { id: id });
  }

  // ##############################################################3
  public registerRLR(user: User) {
    let rlrUser = {
      email: user.email,
      password: user.password,
      userinfo: {
        registeredID: user.registeredId,
        publicName: user.publicName,
        contactNo: user.contactNo,
        postalAddress: user.postalAddress
      }
    }
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.user_rlr_register, rlrUser);
  }

}
