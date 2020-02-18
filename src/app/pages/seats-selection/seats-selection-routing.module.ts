import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeatsSelectionPage } from './seats-selection.page';

const routes: Routes = [
  {
    path: '',
    component: SeatsSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatsSelectionPageRoutingModule {}
