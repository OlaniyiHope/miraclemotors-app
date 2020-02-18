import { Component, OnInit } from '@angular/core';
import { DynamicScriptService } from 'src/app/services/dynamic-script.service';
import { Helpers } from 'src/app/app.helpers';


declare const PaystackPop;
@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.page.html',
  styleUrls: ['./booking-summary.page.scss'],
  providers: [DynamicScriptService]
})
export class BookingSummaryPage implements OnInit {

  constructor(private _script: DynamicScriptService, private helpers: Helpers) {
    this._script.loadScript('paystack').then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

  async processPayment() {
    const user = await this.helpers.getUser();
    const handler = PaystackPop.setup({
      key: 'pk_test_2098765d1d3b9e0870ffd0dbc465cffd99b3a4db',
      email: 'brian@test.com',
      amount: 500 * 100,
      currency: 'NGN',
      metadata: {
        custom_fields: [
          {
            customer: { test: 'br' }
          }
        ]
      },
      callback: async (response) => {
        this.helpers.createLoader('Processing Order...');
        // const reqData: CreateOrder = {
        //   buyerDetails: this.customer._id,
        //   paymentOption: 'card',
        //   paymentReference: response.reference,
        //   deliveryFee: 0,
        //   cart: this.order.cart,
        //   reseller: user._id,
        // };
        // this._orders.createOrder(reqData)
        //   .subscribe(async res => {
        //     await this.helpers.dismissLoader();
        //     this._cart.saveCartToLocal(null);
        //     this.openSuccessModal(res.data);
        //     // this.helpers.registerBackButton.unsubscribe();
        //   }, async error => {
        //     await this.helpers.dismissLoader();
        //     this.openFailureModal();
        //     console.error(error);
        //     // this.helpers.registerBackButton.unsubscribe();
        //   });
        this.helpers.dismissLoader();
        console.log(response);
      },
      onClose: async () => {
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

}
