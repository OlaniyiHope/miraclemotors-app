import { BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Terminal } from '../interfaces/terminal.interface';

@Injectable({
  providedIn: 'root'
})
export class TerminalsService {

  actionUrl = '/terminals';
  selectedTerminals = new BehaviorSubject<{ arrival: Terminal, departure: Terminal }>(null);
  constructor(private api: BaseService) { }

  getTerminals() {
    this.api.setActionUrl(this.actionUrl);
    return this.api.get<Terminal[]>();
  }
}
