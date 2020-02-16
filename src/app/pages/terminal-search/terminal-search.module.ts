import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminalSearchPageRoutingModule } from './terminal-search-routing.module';

import { TerminalSearchPage } from './terminal-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminalSearchPageRoutingModule
  ],
  declarations: [TerminalSearchPage]
})
export class TerminalSearchPageModule {}
