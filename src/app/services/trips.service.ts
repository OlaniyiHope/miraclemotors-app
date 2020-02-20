import { SearchTrips, Trip } from './../interfaces/trips.interface';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  actionUrl = '/trips';

  constructor(private api: BaseService) { }

  searchTrips(data: SearchTrips) {
    this.api.setActionUrl(this.actionUrl, '/search');
    return this.api.get<Trip[]>(new URLSearchParams(data as any).toString());
  }
}
