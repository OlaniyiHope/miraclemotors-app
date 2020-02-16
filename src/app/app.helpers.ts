import {
  LoadingController, AlertController, ToastController,
  Platform, NavController, ModalController, ActionSheetController
} from '@ionic/angular';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalOptions, ActionSheetOptions, AlertButton } from '@ionic/core';
import { Subscription } from 'rxjs';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';


/**
 *  Helper class for commonly used methods
 *
 * @export
 * @class CommonMethods
 */
@Injectable({
  providedIn: 'root'
})
export class Helpers {


  private _navParam: any;
  loading: HTMLIonLoadingElement;
  cache: any;
  registerBackButton: Subscription;
  errorToast: HTMLIonToastElement;
  isErrorToastShown: boolean;
  customLadingModal: HTMLIonModalElement;


  constructor(private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private navCtrl: NavController,
              private platform: Platform,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
    // public storage: Storage,
              private loadingCtrl: LoadingController) {
  }


  /**
   * Returns dirty values of a formgroup
   *
   * @param {FormGroup} formGroup
   * @returns object
   * @memberof Helpers
   */
  getDirtyValues(formGroup: FormGroup) {
    const dirtyValues = {};
    const dirtyNestedValues = {};
    Object.keys(formGroup.controls).forEach(control => {
      const currentControl = formGroup.get(control);
      console.log((currentControl as any).controls);
      if (currentControl.hasOwnProperty('controls')) {
        return dirtyNestedValues[control] = this.getDirtyValues(currentControl as any);
      }

      if (currentControl.dirty) {
        dirtyValues[control] = currentControl.value;
      }
    });
    return { ...dirtyValues, ...dirtyNestedValues };
  }


  /**
   * Creates modal using modal controller
   *
   * @param {ModalOptions} [options]
   * @returns
   * @memberof Helpers
   */
  createModal(options?: ModalOptions) {
    return this.modalCtrl.create(options);
  }


  navPush(page: string, data: any = null) {
    this._navParam = data;
    return this.navCtrl.navigateForward(page);
  }

  setRoot(page: string, data: any = null, navOptions?: NavigationOptions) {
    this._navParam = data;
    if (navOptions) {
      return this.navCtrl.navigateRoot(page, navOptions);
    }
    return this.navCtrl.navigateRoot(page);
  }

  navPop(data: any = null) {
    this._navParam = data;
    return this.navCtrl.pop();
  }

  get navParams() {
    return this._navParam;
  }

  getNavParams(key: string = null) {
    if (this._navParam && key) {
      return this._navParam[key];
    }
    return this._navParam;
  }


  createAlert(message = '', header = '', subHeader = '', buttonText = 'OK') {
    return this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: [
        {
          text: buttonText,
        },
      ]
    });
  }

  createAlertWithHandler(message = '', buttons: Array<AlertButton>, header = '', subHeader = '') {
    return this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons
    });
  }


  // /**
  //  *
  //  *  Creates a native toast
  //  * @param {string} message
  //  * @param {string} [position='bottom']
  //  * @param {number} [duration=3000]
  //  * @returns {Observable}
  //  * @memberof CommonMethods
  //  */
  // async createNativeToast(message: string, position: string = 'bottom', duration: number = 3000) {
  //   return await this.toast.showWithOptions({
  //     message,
  //     position,
  //     duration
  //   }).toPromise();
  // }

  async createLoader(message = '', cssClass = '') {
    this.registerBackButton = this.handleBackButton();
    this.loading = await this.loadingCtrl.create({
      message,
      cssClass
    });

    this.loading.onDidDismiss().then(() => this.registerBackButton.unsubscribe());
    this.loading.present();
    return this.loading;
  }

  // save(key: LocalStorageKey, value) {
  //   return this.storage.set(key, value);
  // }

  // get(key: LocalStorageKey) {
  //   return this.storage.get(key);
  // }

  dismissLoader(isCustom = true) {
    try {
      if (isCustom) {
        return this.customLadingModal.dismiss();

      }
      this.loading.dismiss();
    } catch {
      /* Prevent uncaught errors */
    }
  }


  async createSuccessToast(message = '', cssClass = 'success-toast') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      cssClass,
      color: 'secondary',
      mode: 'ios',
    });
    toast.present();
    return toast;
  }

  async createErrorToast(message = '', cssClass = 'error-toast') {
    if (this.isErrorToastShown) {
      this.dismissErrorToast();
    }
    this.errorToast = await this.toastCtrl.create({
      message,
      duration: 3000,
      cssClass,
      mode: 'ios',
      color: 'danger',

    });
    this.isErrorToastShown = true;
    this.errorToast.present();
    this.errorToast.onDidDismiss().then(() => {
      this.isErrorToastShown = false;
    });

    return this.errorToast;
  }

  dismissErrorToast() {
    if (this.errorToast) {
      this.errorToast.dismiss();
    }
  }


  // /**
  //  *
  //  * helper to get user profile
  //  * @returns {Promise<User>} User profile
  //  * @memberof CommonMethods
  //  */
  // async getUser(): Promise<User> {
  //   return await this.storage.get(LocalStorageKey.user);
  // }


  // /**
  //  * Updates user profile on local db
  //  *
  //  * @param {User} user
  //  * @memberof CommonMethods
  //  */
  // async updateUserProfile(user: any) {
  //   this.storage.set(LocalStorageKey.user, user);
  // }


  /**
   * Handles back button action
   *
   * @param {Function} [customHandler=() => { }]
   * @returns Unregister
   * @memberof CommonMethods
   */
  handleBackButton(customHandler: Function = () => { }, priority: number = 100) {
    console.log(this.platform.backButton);
    return this.platform.backButton.subscribeWithPriority(priority, customHandler());
  }




  sortAlphabetically(arr: any[], property?: string) {
    return arr.sort((a, b) => {
      if (property) {
        return a[property].toLowerCase() < b[property].toLowerCase() ? -1 : 1;
      }
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });
  }



  createActionSheet(opts: ActionSheetOptions) {
    return this.actionSheetCtrl.create(opts);
  }

}

