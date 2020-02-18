import { IonicModule } from '@ionic/angular';
import { TripSummaryComponent } from './trip-summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    TripSummaryComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    TripSummaryComponent
  ]
})
export class TripSummaryModule { }
