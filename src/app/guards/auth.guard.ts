import { Helpers } from 'src/app/app.helpers';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageKey } from '../enums/local-storage-keys.enum';
import { Pages } from '../enums/pages.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _helpers: Helpers) { }

  async canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
    const accessToken = await this._helpers.get(LocalStorageKey.accessToken);
    const user = await this._helpers.get(LocalStorageKey.user);
    if (accessToken && user) {
      return true;
    }

    this._helpers.setRoot(Pages.signin);
    return false;
  }

}


