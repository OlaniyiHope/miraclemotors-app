import { TripSummaryModule } from './../../components/trip-summary/trip-summary.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripSearchResultPageRoutingModule } from './trip-search-result-routing.module';

import { TripSearchResultPage } from './trip-search-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripSearchResultPageRoutingModule,
    TripSummaryModule
  ],
  declarations: [TripSearchResultPage]
})
export class TripSearchResultPageModule {}
