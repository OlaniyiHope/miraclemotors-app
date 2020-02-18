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
    SeatsSelectionPageRoutingModule
  ],
  declarations: [SeatsSelectionPage]
})
export class SeatsSelectionPageModule {}
