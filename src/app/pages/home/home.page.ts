import { Helpers } from './../../app.helpers';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  passengers = { adults: 1, children: 0, total: 1 };
  constructor(private helpers: Helpers, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async openTerminalSearch(type: 'departure' | 'arrival') {
    this.helpers.navPush('/terminal-search');
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
        }
      ]
    });

    await alert.present();
    const { values: { adults, children } } = (await alert.onDidDismiss()).data;
    this.passengers.adults = (!adults || adults == 0) ? 1 : adults;
    this.passengers.children = children;
    this.passengers.total = Number(this.passengers.adults) + Number(this.passengers.children);
    console.log(adults, children);

  }
}
