import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminalSearchPage } from './terminal-search.page';

const routes: Routes = [
  {
    path: '',
    component: TerminalSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminalSearchPageRoutingModule {}
