import { Injectable } from '@angular/core';

export interface AuthUser {
  id: number,
  type: string,
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _currentAuthUser: AuthUser;

  constructor() { }

  public get currentAuthUser(): AuthUser {
    return this._currentAuthUser;
  }

  public set currentAuthUser(v: AuthUser) {
    this._currentAuthUser = v;
  }



}
