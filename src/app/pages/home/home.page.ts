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
  constructor(private _terminal: TerminalsService, private helpers: Helpers, private alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listenToTerminalChanges();
  }

  listenToTerminalChanges() {
    this.selectedTerminals$ = this._terminal.selectedTerminals.subscribe(data => {
      this.terminals = { arrival: data?.arrival, departure: data?.departure };
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

  ionViewWillLeave() {

    this.selectedTerminals$.unsubscribe();
  }
}
