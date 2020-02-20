import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Helpers } from 'src/app/app.helpers';
import { Pages } from 'src/app/enums/pages.enum';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;
  constructor(private statusBar: StatusBar, private _auth: AuthService, private fb: FormBuilder, private helpers: Helpers) {


    this.signinForm = this.fb.group({
      phoneNumber: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#5acafa');
    this.statusBar.styleDefault();
  }

  async submitForm() {
    await this.helpers.createLoader('Logging in. Please wait...');
    const reqData = this.signinForm.value;
    this._auth.login(reqData).subscribe(
      async res => {
        await this._auth.authSuccess(res.data.accessToken, res.data.refreshToken, res.data.user);
        await this.helpers.setRoot(Pages.home);
        this.helpers.dismissLoader();
      },
      error => {
        this.helpers.dismissLoader();
        console.error(error);
      }
    );

  }

  async  gotoSignupPage() {
    this.helpers.navPush(Pages.signup);

  }
}
