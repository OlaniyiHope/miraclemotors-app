import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Helpers } from 'src/app/app.helpers';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageKey } from 'src/app/enums/local-storage-keys.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  editProfileForm: FormGroup;

  constructor(private fb: FormBuilder, private helpers: Helpers, private _user: UserService) {
    this.initializeForm();

  }

  ngOnInit() {
  }

  async initializeForm() {
    this.user = await this.helpers.getUser();
    this.editProfileForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      gender: [this.user.gender, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      profile: this.fb.group({
        kinFullName: [this.user.profile.kinFullName],
        kinPhoneNumber: [this.user.profile.kinPhoneNumber]
      })
    });
  }

  async saveProfileDetails() {
    const reqData = this.helpers.getDirtyValues<User>(this.editProfileForm);
    await this.helpers.createLoader('Updating your profile...');
    this._user.updateProfile(reqData).subscribe(async res => {
      this.helpers.save(LocalStorageKey.user, res.data);
      await this.helpers.dismissLoader();
      this.helpers.createSuccessToast(res.message);
    }, error => {
      console.error(error);
      this.helpers.dismissLoader();
    });
  }


}
