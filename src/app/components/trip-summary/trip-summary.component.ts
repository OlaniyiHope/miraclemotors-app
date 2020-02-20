import { PassengersData } from './../../interfaces/passenger.interface';
import { Terminal } from './../../interfaces/terminal.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.component.html',
  styleUrls: ['./trip-summary.component.scss'],
})
export class TripSummaryComponent implements OnInit {

  @Input() terminals: { departure: Terminal, arrival: Terminal };
  @Input() departureDate: string;
  @Input() passengers: PassengersData;
  constructor() { }

  ngOnInit() { }

}
