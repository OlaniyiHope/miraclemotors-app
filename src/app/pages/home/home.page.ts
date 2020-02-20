import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SearchTrips } from './../../interfaces/trips.interface';
import { TripsService } from './../../services/trips.service';
import { Subscription } from 'rxjs';
import { Terminal } from 'src/app/interfaces/terminal.interface';
import { TerminalsService } from './../../services/terminals.service';
import { Helpers } from './../../app.helpers';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Pages } from 'src/app/enums/pages.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  passengers = { adults: 1, children: 0, total: 1 };
  terminals: { arrival: Terminal, departure: Terminal };
  selectedTerminals$: Subscription;
  departureDate: string;
  bookingType: 'one_way' | 'round_trip' = 'one_way';
  returnDate: string;
  constructor(
    private statusBar: StatusBar,
    private _trips: TripsService,
    private _terminal: TerminalsService,
    private helpers: Helpers,
    private alertCtrl: AlertController) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByName('white');
    this.statusBar.styleDefault();
    this.listenToTerminalChanges();
  }

  listenToTerminalChanges() {
    this.selectedTerminals$ = this._terminal.selectedTerminals.subscribe((data) => {
      this.terminals = { arrival: data?.arrival || this?.terminals?.arrival, departure: data?.departure || this?.terminals?.departure };
    });
  }

  async openTerminalSearch(type: 'departure' | 'arrival') {
    this.helpers.navPush(`${Pages.terminalSearch}/${type}`, { type });
  }

  async openPassengers() {
    const alert = await this.alertCtrl.create({
      header: 'Number of Travelers',
      inputs: [
        {
          name: 'adults',
          type: 'number',
          placeholder: 'Number of Adult Travelers',
          min: 1,
          value: this.passengers.adults
        },
        {
          name: 'children',
          type: 'number',
          label: 'Children Travelers',
          placeholder: 'Number of Children Travelers',
          value: this.passengers.children
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: ({ adults, children }) => {
            this.passengers.adults = (!adults || adults == 0) ? 1 : adults;
            this.passengers.children = children;
            this.passengers.total = Number(this.passengers.adults) + Number(this.passengers.children);
            console.log(adults, children);
          }
        }
      ]
    });

    await alert.present();


  }

  async searchForTrip() {
    const reqObj: SearchTrips = {
      arrivalTerminalId: this.terminals?.arrival?.id,
      departureTerminalId: this.terminals?.departure?.id,
      departureTimestamp: this.departureDate,
    };
    console.log(Object.values(reqObj));
    if (Object.values(reqObj).includes(null || undefined)) {
      this.helpers.createErrorToast('Please fill in all fields');
      return;
    }

    if (this.bookingType == 'round_trip' && !this.returnDate) {
      this.helpers.createErrorToast('Please select a return date!');
      return;
    }

    await this.helpers.createLoader('Searching For Available Trips...');
    this._trips.searchTrips(reqObj).subscribe(async res => {
      await this.helpers.dismissLoader();
      if (!res.data.length) {
        await (await this.helpers.createAlert(`No bus available for selected location and date!`, 'No Available Bus')).present();
        return;
      }

      await this.helpers.navPush(`${Pages.tripSearch}/departure`, {
        selectedReturnDate: this.returnDate,
        type: this.bookingType, passengers: this.passengers, trips: res.data
      });

    }, error => {
      console.error(error);
    });
  }

  ionViewWillLeave() {
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByHexString('#425486');
    this.selectedTerminals$.unsubscribe();
  }
}
