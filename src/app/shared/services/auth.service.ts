import { Injectable } from '@angular/core';
import { HttpResolverService } from './http-resolver.service';
import { BackendURLS } from '../utils/backend-urls.enum';
import { CookieService } from 'ngx-cookie-service';

export interface AuthUser {
  id: number,
  type: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _currentAuthUser: AuthUser;
  currentUser: any = null;

  constructor(private httpResolverService: HttpResolverService, private cookieService: CookieService) { }

  public get currentAuthUser(): AuthUser {
    return this._currentAuthUser;
  }

  public set currentAuthUser(v: AuthUser) {
    this._currentAuthUser = v;
  }

  public loginUserBackend() {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.user_login_backend, { email: this.currentAuthUser.email, password: this.currentAuthUser.password });
  }

  public loginUserBlockchain(regId: string) {
    return this.httpResolverService.realizarHttpPost(
      BackendURLS.user_login_blockchain, { regId: regId });
  }

  public async logout() {
    this.cookieService.deleteAll();
    await this.delay(600);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
