import { TripSummaryModule } from './../../components/trip-summary/trip-summary.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatsSelectionPageRoutingModule } from './seats-selection-routing.module';

import { SeatsSelectionPage } from './seats-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeatsSelectionPageRoutingModule,
    TripSummaryModule
  ],
  declarations: [SeatsSelectionPage]
})
export class SeatsSelectionPageModule {}
