import { User } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/user.interface';
import { BaseService } from './base.service';

@Injectable()
export class ProfileService {

  actionUrl = '/profiles';
  constructor(private api: BaseService) { }

  updateProfile(profile: Profile) {
    this.api.setActionUrl(this.actionUrl);
    return this.api.update<User>('me', profile);
  }

}
