import { Helpers } from 'src/app/app.helpers';
import { Component, OnInit } from '@angular/core';
import { TerminalsService } from 'src/app/services/terminals.service';
import { Terminal } from 'src/app/interfaces/terminal.interface';
import { Pages } from 'src/app/enums/pages.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terminal-search',
  templateUrl: './terminal-search.page.html',
  styleUrls: ['./terminal-search.page.scss'],
})
export class TerminalSearchPage implements OnInit {
  terminals: Terminal[];
  allTerminals: Terminal[];
  title: string;

  constructor(private route: ActivatedRoute, private helpers: Helpers, private _terminal: TerminalsService) {
    this.getTerminals();
    this.title = this.route.snapshot.paramMap.get('type');
  }

  ngOnInit() {
  }

  getTerminals() {
    this._terminal.getTerminals()
      .subscribe(res => {
        this.terminals = res.data;
        this.allTerminals = this.terminals;
      }, err => {
        console.error(err);
      });
  }


  search(ev: CustomEvent) {
    let value = ev.detail.value;
    console.log(value);
    if (value == '') {
      this.terminals = this.allTerminals;
      return;
    }
    this.terminals = this.allTerminals.filter(terminal => {
      value = value.toLowerCase();
      const { name, lga, state } = terminal;
      return (name.toLowerCase().includes(value) || lga.name.toLowerCase().includes(value) || state.name.toLowerCase().includes(value));
    });

  }

  async selectTerminal(terminal: Terminal) {
    const type = this.route.snapshot.paramMap.get('type');
    let terminalData = this.helpers.getNavParams('terminalData');
    console.log(terminalData);
    if (type == 'arrival') {
      terminalData = { ...terminalData, arrival: terminal };
      this.helpers.setRoot(Pages.home, { terminalData });
    } else {
      terminalData = { ...terminalData, departure: terminal };
      this.helpers.navPush(`${Pages.terminalSearch}/arrival`, { terminalData });
    }
    this._terminal.selectedTerminals.next(terminalData);
  }


}
