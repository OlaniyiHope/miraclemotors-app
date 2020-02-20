export interface Seat {
    id: string;
    seatNumber: number;
}

enum Status {
    Available = 'available',
    Booked = 'booked'
}

export interface Vehicle {
    id: string;
    plateNumber: PlateNumber;
    status: Status;
    features: Feature[];
    type: Type;
}
export interface Feature {
    id: string;
    attribute: Attribute;
}
export enum Attribute {
    AC = 'ac'
}
export enum PlateNumber {
    Sd4334Qad = 'SD4334QAD',
    Sd4334Qsd = 'SD4334QSD'
}
export interface Type {
    id: string;
    model: Model;
    seatsNumber: number;
}
export enum Model {
    Toyota5858 = 'Toyota5858',
    ToyotaCamry = 'Toyota Camry'
}
