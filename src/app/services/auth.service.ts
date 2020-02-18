import { User } from './../interfaces/user.interface';
import { Helpers } from 'src/app/app.helpers';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LocalStorageKey } from '../enums/local-storage-keys.enum';
import { Pages } from '../enums/pages.enum';

/*
  Generated class for the AuthService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  actionUrl = '/auth';
  constructor(public api: BaseService, private helpers: Helpers) {
    console.log('AuthService Service');
  }

  signup(data) {
    this.api.setActionUrl(this.actionUrl, '/signup');
    return this.api.post<any>(data);
  }

  resetPassword(data: { email: string }) {
    this.api.setActionUrl(this.actionUrl, '/reset');
    return this.api.post<any>(data);
  }

  login(data) {
    this.api.setActionUrl(this.actionUrl, '/signin');
    return this.api.post<any>(data);

  }

  verifyOtp(otp: string) {
    this.api.setActionUrl(this.actionUrl, '/verify');
    return this.api.post<any>({ otp });
  }

  public refreshToken(refreshToken: string) {
    this.api.setActionUrl(this.actionUrl, '/refresh-token');
    return this.api.post<any>({ refreshToken });
  }

  public resendOTP() {
    this.api.setActionUrl(this.actionUrl, '/resend-otp');
    return this.api.post<any>(null);
  }

  async authSuccess(accessToken, refreshToken, user: User) {
    await this.helpers.save(LocalStorageKey.accessToken, accessToken);
    await this.helpers.save(LocalStorageKey.refreshToken, refreshToken);
    await this.helpers.save(LocalStorageKey.user, user);
    return true;
  }

  async logout() {
    await this.helpers.storage.remove(LocalStorageKey.accessToken);
    await this.helpers.storage.remove(LocalStorageKey.refreshToken);
    await this.helpers.storage.remove(LocalStorageKey.user);
    await this.helpers.setRoot(Pages.home);
    return true;
  }
}
