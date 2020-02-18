import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seats-selection',
  templateUrl: './seats-selection.page.html',
  styleUrls: ['./seats-selection.page.scss'],
})
export class SeatsSelectionPage implements OnInit {

  selectedSeats = [];
  constructor() { }

  ngOnInit() {
  }

  toggleSeat(seat) {
    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.pop();
    }
  }

}
