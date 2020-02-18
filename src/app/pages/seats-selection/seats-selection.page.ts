import { Helpers } from 'src/app/app.helpers';
import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/enums/pages.enum';

@Component({
  selector: 'app-seats-selection',
  templateUrl: './seats-selection.page.html',
  styleUrls: ['./seats-selection.page.scss'],
})
export class SeatsSelectionPage implements OnInit {

  selectedSeats = [];
  constructor(private helpers: Helpers) { }

  ngOnInit() {
  }

  toggleSeat(seat) {
    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.pop();
    }
  }

  goToPassengerDetails() {
    this.helpers.navPush(Pages.passengerDetails);
  }

}
