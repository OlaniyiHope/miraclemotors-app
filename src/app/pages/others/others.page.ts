import { Helpers } from 'src/app/app.helpers';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {
  user: User;

  constructor(private helpers: Helpers, private _auth: AuthService) {
    this.getUser();
  }

  ngOnInit() {
  }

  async getUser() {
    this.user = await this.helpers.getUser();
  }
  logout() {
    this._auth.logout();
  }

}
