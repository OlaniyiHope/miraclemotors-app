import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassengerDetailsPageRoutingModule } from './passenger-details-routing.module';

import { PassengerDetailsPage } from './passenger-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassengerDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PassengerDetailsPage]
})
export class PassengerDetailsPageModule {}
