import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
        ]
      },
      {
        path: 'bookings',
        children: [
          {
            path: '',
            loadChildren: () => import('../bookings/bookings.module').then(m => m.BookingsPageModule)
          },
        ]
      },
      {
        path: 'others',
        children: [
          {
            path: '',
            loadChildren: () => import('../others/others.module').then(m => m.OthersPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
