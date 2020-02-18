
export interface Terminal {
    id: string;
    name: string;
    state: Location;
    lga: Location;
}

interface Location {
    id: number;
    name: string;
}
