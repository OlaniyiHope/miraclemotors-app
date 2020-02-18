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

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
