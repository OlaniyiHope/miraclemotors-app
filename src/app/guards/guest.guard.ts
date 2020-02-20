import { Helpers } from 'src/app/app.helpers';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Pages } from '../enums/pages.enum';
import { LocalStorageKey } from '../enums/local-storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanLoad {
  constructor(private _helpers: Helpers) { }


  async  canLoad(route: Route, _segments: UrlSegment[]) {
    const accessToken = await this._helpers.get(LocalStorageKey.accessToken);
    if (accessToken) {
      this._helpers.setRoot(Pages.tabs);
      return false;
    }
    return true;


  }
}
