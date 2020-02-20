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
  allBookings: BookingModel[];

  constructor(private _bookings: BookingService, private helpers: Helpers) {
  }

  ngOnInit() {
  }

  async fetchBookings() {
    await this.helpers.createLoader('Fetching your trips!');
    this._bookings.getUserBookings()
      .subscribe(res => {
        this.bookings = res.data;
        this.allBookings = res.data;
        this.helpers.dismissLoader();
      }, err => {
        this.helpers.dismissLoader();
      });
  }

  search(ev: CustomEvent) {
    const value = ev.detail.value.toLowerCase();
    if (value == '') {
      this.bookings = this.allBookings;
      return;
    }
    this.bookings = this.allBookings.filter(bookings => {
      return (bookings.referenceId.toLowerCase().includes(value));
    });

  }
  ionViewDidEnter() {
    this.fetchBookings();
  }

}
