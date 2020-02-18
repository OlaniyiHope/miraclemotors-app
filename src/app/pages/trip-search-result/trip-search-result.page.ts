import { Pages } from 'src/app/enums/pages.enum';
import { Helpers } from 'src/app/app.helpers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-search-result',
  templateUrl: './trip-search-result.page.html',
  styleUrls: ['./trip-search-result.page.scss'],
})
export class TripSearchResultPage implements OnInit {

  constructor(private helpers: Helpers) { }

  ngOnInit() {
  }

  selectTrip() {
    this.helpers.navPush(Pages.seatSelection);
  }
}
