import { ActivatedRoute } from '@angular/router';
import { TripsService } from './../../services/trips.service';
import { Trip, Seat, SearchTrips } from './../../interfaces/trips.interface';
import { Terminal } from './../../interfaces/terminal.interface';
import { PassengersData } from './../../interfaces/passenger.interface';
import { Helpers } from 'src/app/app.helpers';
import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/enums/pages.enum';

@Component({
  selector: 'app-seats-selection',
  templateUrl: './seats-selection.page.html',
  styleUrls: ['./seats-selection.page.scss'],
})
export class SeatsSelectionPage implements OnInit {

  selectedSeats: Seat[] = [];
  departureDate: string;
  passengers: PassengersData;
  terminals: { arrival: Terminal; departure: Terminal; };
  trip: Trip;
  title: string;
  constructor(private route: ActivatedRoute, private helpers: Helpers, private _trips: TripsService) {
    this.title = this.route.snapshot.paramMap.get('type');
    this.trip = this.helpers.getNavParams('activeTrip');
    this.passengers = this.helpers.getNavParams('passengers');
    this.terminals = { arrival: this.trip.arrivalTerminal, departure: this.trip.departureTerminal };
    this.departureDate = this.trip.departureTimestamp;
  }

  ngOnInit() {
  }

  getSeatStatusImage(seatNumber: number) {
    let image = 'assets/imgs/available-seat.svg';
    const seats = this.trip.seats;
    const seat = seats.find((_seat) => _seat.seatNumber == seatNumber);
    if (seat) {
      if (seat.status == 'booked') {
        image = 'assets/imgs/booked-seat.svg';
      }

      if (seat.status == 'available' && this.selectedSeats.includes(seat)) {
        image = 'assets/imgs/selected-seat.svg';
      }
    }

    return image;
  }

  toggleSeat(seatNumber: number) {

    const seat = this.getSeat(seatNumber);
    if (seat && seat.status == 'available') {
      if (this.selectedSeats.includes(seat)) {
        this.selectedSeats = this.selectedSeats.filter(_seat => _seat.seatNumber != seatNumber);
      } else {
        if (this.selectedSeats.length == this.passengers.total) {
          return this.helpers.createSuccessToast(`${this.passengers.total} seats already selected!`);
        }
        this.selectedSeats.push(seat);
      }
    }
  }

  getSeat(seatNumber: number) {
    return this.trip.seats.find((seat) => seat.seatNumber == seatNumber);
  }

  async submit() {
    if (this.selectedSeats.length < this.passengers.total) {
      await (await this.helpers.createErrorToast(`Please select ${this.passengers.total} seats to continue!`)).present();
      return;
    }
    const bookings = this.helpers.getNavParams('bookings');
    const selectedSeatsIds = this.selectedSeats.map(seat => seat.id);
    bookings.forEach((val, index) => {
      if (val.tripId == this.trip.id) {
        bookings[index] = { ...bookings[index], seats: selectedSeatsIds };
      }
    });
    const navData = { ...this.helpers.getNavParams(), bookings, terminals: this.terminals };
    if (navData.type == 'round_trip' && bookings.length != 2) {
      this.searchReturnTrip(navData);
      return;
    }
    this.helpers.navPush(Pages.passengerDetails, navData);
  }


  async searchReturnTrip(navData: any) {
    const reqObj: SearchTrips = {
      arrivalTerminalId: this.terminals.departure.id,
      departureTerminalId: this.terminals.arrival.id,
      departureTimestamp: this.helpers.getNavParams('selectedReturnDate'),
    };
    await this.helpers.createLoader('Searching For Available <b>Return Trips</b>...');
    this._trips.searchTrips(reqObj).subscribe(async res => {
      await this.helpers.dismissLoader();
      if (!res.data.length) {
        await (await this.helpers.createAlert(`No bus available for selected return date!`, 'No Available Bus For Return date')).present();
        return;
      }

      await this.helpers.navPush(`${Pages.tripSearch}/return`, {
        ...navData,
        trips: res.data,
      });

    }, async error => {
      await this.helpers.dismissLoader();
      console.error(error);
    });
  }
}

