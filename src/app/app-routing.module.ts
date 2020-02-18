import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'terminal-search/:type',
    loadChildren: () => import('./pages/terminal-search/terminal-search.module').then( m => m.TerminalSearchPageModule)
  },
  {
    path: 'trip-search-result',
    loadChildren: () => import('./pages/trip-search-result/trip-search-result.module').then( m => m.TripSearchResultPageModule)
  },
  {
    path: 'seats-selection',
    loadChildren: () => import('./pages/seats-selection/seats-selection.module').then( m => m.SeatsSelectionPageModule)
  },
  {
    path: 'passenger-details',
    loadChildren: () => import('./pages/passenger-details/passenger-details.module').then( m => m.PassengerDetailsPageModule)
  },
  {
    path: 'booking-summary',
    loadChildren: () => import('./pages/booking-summary/booking-summary.module').then( m => m.BookingSummaryPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
