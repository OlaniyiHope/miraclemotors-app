import { Helpers } from 'src/app/app.helpers';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Pages } from 'src/app/enums/pages.enum';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.page.html',
  styleUrls: ['./passenger-details.page.scss'],
})
export class PassengerDetailsPage implements OnInit {

  constructor(private alertCtrl: AlertController, private helpers: Helpers) { }

  ngOnInit() {
  }

  async addPassenger() {



    const alert = await this.alertCtrl.create({
      header: 'Enter Full Name',
      inputs: [

        {
          name: 'name',
          type: 'text',
          placeholder: 'Enter Full Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ({ name }) => {
            if (!name.trim().length) {
              this.helpers.createErrorToast(`Please enter passenger full name`);
              return false;
            }
            alert.dismiss().then(async () => {
              await this.presentSelectSexAlert(name);
              console.log('Confirm Ok');
            });
            return false;
          }
        }
      ]
    });

    await alert.present();
  }

  async presentSelectSexAlert(name: string) {
    const alert = await this.alertCtrl.create({
      header: 'Select Gender',
      inputs: [

        {
          name: 'gender',
          type: 'radio',
          label: 'Male',
          value: 'male',
        },
        {
          name: 'gender',
          type: 'radio',
          label: 'Female',
          value: 'female'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    return alert.present();
  }

  gotoSummary() {
    this.helpers.navPush(Pages.bookingSummary);
  }
}
