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
    TripSearchResultPageRoutingModule
  ],
  declarations: [TripSearchResultPage]
})
export class TripSearchResultPageModule {}
