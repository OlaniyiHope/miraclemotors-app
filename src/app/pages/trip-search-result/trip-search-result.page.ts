import { ActivatedRoute } from '@angular/router';
import { PassengersData } from './../../interfaces/passenger.interface';
import { Pages } from 'src/app/enums/pages.enum';
import { Helpers } from 'src/app/app.helpers';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/interfaces/trips.interface';

@Component({
  selector: 'app-trip-search-result',
  templateUrl: './trip-search-result.page.html',
  styleUrls: ['./trip-search-result.page.scss'],
})
export class TripSearchResultPage implements OnInit {
  trips: Trip[];
  passengers: PassengersData;
  departureDate: string;
  terminals: any;
  title: string;

  constructor(private helpers: Helpers, private route: ActivatedRoute) {
    this.title = this.route.snapshot.paramMap.get('type');
    this.trips = this.helpers.getNavParams('trips');
    this.passengers = this.helpers.getNavParams('passengers');
    this.terminals = { arrival: this.trips[0].arrivalTerminal, departure: this.trips[0].departureTerminal };
    this.departureDate = this.trips[0].departureTimestamp;
  }

  ngOnInit() {
  }

  selectTrip(trip: Trip) {
    let departureDate = this.helpers.getNavParams('departureDate');
    let returnDate = this.helpers.getNavParams('returnDate');
    const type = this.route.snapshot.paramMap.get('type');
    const bookings = this.helpers.getNavParams('bookings') || [];
    if (type == 'departure') {
      bookings[0] = { tripId: trip.id, price: trip.price };
      departureDate = trip.departureTimestamp;
    } else if (type == 'return') {
      bookings[1] = { tripId: trip.id, price: trip.price };
      returnDate = trip.departureTimestamp;
    }

    this.helpers.navPush(`${Pages.seatSelection}/${type}`, {
      ...this.helpers.getNavParams(),
      bookings, activeTrip: trip, departureDate, returnDate
    });
  }
}
