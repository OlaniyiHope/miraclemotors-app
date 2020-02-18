import { TripSummaryModule } from './../../components/trip-summary/trip-summary.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingSummaryPageRoutingModule } from './booking-summary-routing.module';

import { BookingSummaryPage } from './booking-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingSummaryPageRoutingModule,
    TripSummaryModule
  ],
  declarations: [BookingSummaryPage]
})
export class BookingSummaryPageModule {}
