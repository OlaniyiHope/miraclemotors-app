import { Helpers } from './../../app.helpers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private helpers: Helpers) { }

  ngOnInit() {
  }

  async openTerminalSearch() {
    this.helpers.navPush('/terminal-search');
  }
}
