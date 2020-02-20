import { BaseService } from './base.service';
import { User } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  actionUrl = '/users';
  constructor(private api: BaseService) { }

  updateProfile(reqData: User) {
    this.api.setActionUrl(this.actionUrl);
    return this.api.update('me', reqData);
  }
}
