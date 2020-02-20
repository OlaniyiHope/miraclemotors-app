import { Terminal } from './terminal.interface';
import { Vehicle } from './vehicle.interface';

export interface SearchTrips {
    departureTimestamp: string;
    arrivalTerminalId: string;
    departureTerminalId: string;
}

enum Status {
    Available = 'available',
    Booked = 'booked'
}

export interface Trip {
    id: string;
    departureTimestamp: string;
    status: Status;
    price: string;
    updatedAt: string;
    createdAt: string;
    arrivalTerminal: Terminal;
    departureTerminal: Terminal;
    vehicle: Vehicle;
    seats: Seat[];
}

export interface Seat {
    id: string;
    seatNumber: number;
    status: Status;
}


