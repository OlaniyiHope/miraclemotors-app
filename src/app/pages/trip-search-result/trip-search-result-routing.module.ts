import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripSearchResultPage } from './trip-search-result.page';

const routes: Routes = [
  {
    path: '',
    component: TripSearchResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripSearchResultPageRoutingModule {}
