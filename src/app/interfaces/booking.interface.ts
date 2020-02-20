import { User } from './user.interface';

import { Trip } from './trips.interface';

import { Seat } from './vehicle.interface';

// Generated by https://quicktype.io

export interface BookingTrip {
    paymentRef: string;
    type: string;
    numberOfTravellers: number;
    bookings: Booking[];
    passengers: Passenger[];
}

export interface Booking {
    price?: number;
    tripId: string;
    seats: string[];
}

export interface Passenger {
    name: string;
    ageBracket: string;
    gender: string;
}


// Generated by https://quicktype.io

export interface BookingModel {
    id: string;
    referenceId: string;
    numberOfTravellers: number;
    type: string;
    updatedAt: string;
    createdAt: string;
    user: User;
    trip: Trip;
    seats: Seat[];
    passengers: Passenger[];
    payment: null;
}

