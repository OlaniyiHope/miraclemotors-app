import { Helpers } from 'src/app/app.helpers';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
  providers: [AppRate, AppVersion]
})
export class OthersPage implements OnInit {
  user: User;
  version: string;

  constructor(private appVersion: AppVersion, private appRate: AppRate, private helpers: Helpers, private _auth: AuthService) {
    this.getUser();
    this.getAppVersion();
  }

  async getAppVersion() {
    this.version = await this.appVersion.getVersionNumber();
  }

  ngOnInit() {
  }

  async getUser() {
    this.user = await this.helpers.getUser();
  }

  logout() {
    this._auth.logout();
  }

  rateApp() {
    this.appRate.preferences = {
      usesUntilPrompt: 3,

      storeAppURL: {
        ios: '<app_id>',
        android: 'market://details?id=com.miraclemotors.app',
      }
    };

    this.appRate.promptForRating(true);
  }
}
