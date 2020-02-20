import { Helpers } from 'src/app/app.helpers';
import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { BookingModel } from 'src/app/interfaces/booking.interface';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  providers: [BookingService]
})
export class BookingsPage implements OnInit {
  bookings: BookingModel[];

  constructor(private _bookings: BookingService, private helpers: Helpers) {
  }

  ngOnInit() {
  }

  async fetchBookings() {
    await this.helpers.createLoader('Fetching your trips!');
    this._bookings.getUserBookings()
      .subscribe(res => {
        this.bookings = res.data;
        this.helpers.dismissLoader();
      });
  }

  ionViewDidEnter() {
    this.fetchBookings();
  }

}
