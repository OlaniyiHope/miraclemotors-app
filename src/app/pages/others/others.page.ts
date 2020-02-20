import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this._auth.logout();
  }

}
