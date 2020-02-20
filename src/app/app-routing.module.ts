import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Pages } from './enums/pages.enum';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: '', redirectTo: Pages.signin, pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'terminal-search/:type',
    loadChildren: () => import('./pages/terminal-search/terminal-search.module').then(m => m.TerminalSearchPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'trip-search-result/:type',
    loadChildren: () => import('./pages/trip-search-result/trip-search-result.module').then(m => m.TripSearchResultPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'seats-selection/:type',
    loadChildren: () => import('./pages/seats-selection/seats-selection.module').then(m => m.SeatsSelectionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'passenger-details',
    loadChildren: () => import('./pages/passenger-details/passenger-details.module').then(m => m.PassengerDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'booking-summary',
    loadChildren: () => import('./pages/booking-summary/booking-summary.module').then(m => m.BookingSummaryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninPageModule),
    canLoad: [GuestGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule),
    canLoad: [GuestGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: Pages.signin, pathMatch: 'full' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
