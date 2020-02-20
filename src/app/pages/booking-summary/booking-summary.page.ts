import { ProfileService } from './../../services/profile.service';
import { BookingService } from './../../services/booking.service';
import { Terminal } from 'src/app/interfaces/terminal.interface';
import { BookingTrip } from './../../interfaces/booking.interface';
import { Component, OnInit } from '@angular/core';
import { DynamicScriptService } from 'src/app/services/dynamic-script.service';
import { Helpers } from 'src/app/app.helpers';
import { LocalStorageKey } from 'src/app/enums/local-storage-keys.enum';


declare const PaystackPop;
@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.page.html',
  styleUrls: ['./booking-summary.page.scss'],
  providers: [DynamicScriptService, BookingService, ProfileService]
})
export class BookingSummaryPage implements OnInit {
  bookingData: BookingTrip;
  terminals: { arrival: Terminal; departure: Terminal; };
  departureDate: string;
  returnDate: string;
  total: number;
  constructor(private _profile: ProfileService, private _script: DynamicScriptService,
              private helpers: Helpers, private _booking: BookingService) {
    this.bookingData = this.helpers.getNavParams();
    this.terminals = this.helpers.getNavParams('terminals');
    this.departureDate = this.helpers.getNavParams('departureDate');
    this.returnDate = this.helpers.getNavParams('returnDate');
    this.calculateTripTotal();
    this._script.loadScript('paystack').then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

  calculateTripTotal() {
    const bookingPrices = this.bookingData.bookings.map((booking) => booking.price);
    this.total = bookingPrices.reduce((a, b) => Number(a) + Number(b));
    this.total *= this.bookingData.passengers.length;
  }

  async processPayment() {
    const user = await this.helpers.getUser();
    await this.helpers.createLoader('Processing Booking...');
    const handler = PaystackPop.setup({
      key: 'pk_test_2098765d1d3b9e0870ffd0dbc465cffd99b3a4db',
      email: user.email,
      amount: this.total * 100,
      currency: 'NGN',
      metadata: {
        custom_fields: [
          {
            customer: { ...user }
          }
        ]
      },
      callback: async (response) => {
        const reqData: BookingTrip = {
          ...this.bookingData,
          paymentRef: response.reference,
          numberOfTravellers: this.bookingData.passengers.length
        };
        this._booking.bookTrip(reqData)
          .subscribe(async res => {
            this.updateUserProfile();
            await this.helpers.dismissLoader();
            console.log(res);
            const alert = await this.helpers.createAlertWithHandler('Your trip has been successfully booked!', [{
              text: 'OK',
              handler: () => {
                this.helpers.setRoot('tabs/bookings', null).then(() => {
                  alert.dismiss();
                });
                return false;
              }
            }], 'Booking Successful!');
            alert.present();
          }, async error => {
            await this.helpers.dismissLoader();
          });
        console.log(response);
      },
      onClose: async () => {
        this.helpers.dismissLoader();
        // await this.helpers.createNativeToast("Payment cancelled!");
        // this.helpers.registerBackButton.unsubscribe();
        console.log('window closed');
      }
    });
    console.log(handler);
    handler.openIframe();
    // this.helpers.registerBackButton = this.helpers.handleBackButton(async () => {
    //   handler.closeNewCheckout();
    //   handler.closeOldCheckout();
    //   handler.callCloseCallback();
    // });
  }

  updateUserProfile() {
    const profile = this.helpers.getNavParams('profile');
    if (profile) {
      this._profile.updateProfile(profile).subscribe((res) => {
        this.helpers.save(LocalStorageKey.user, res.data);
      }, err => {
        console.error(err);
      });

    }
  }
}
