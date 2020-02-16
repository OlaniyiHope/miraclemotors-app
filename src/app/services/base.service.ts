import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeoutWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseUrl: string;
  // tslint:disable-next-line:variable-name
  private _actionUrl: string;
  private timeOut: number;

  constructor(public http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.timeOut = 60000;
  }
  public get<T>() {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${this.actionUrl}`)
      .pipe(timeoutWith(this.timeOut, this.handleTimeout()));

  }

  public post<T>(input: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${this.actionUrl}`, input)
      .pipe(timeoutWith(this.timeOut, this.handleTimeout()));
  }

  public update<T>(id: string, data: any, path = ''): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}${this.actionUrl}/${id}/${path}`, data)
      .pipe(timeoutWith(this.timeOut, this.handleTimeout()));

  }

  public delete<T>(): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}${this.actionUrl}`)
      .pipe(timeoutWith(this.timeOut, this.handleTimeout()));
  }

  public setActionUrl(actionUrl: string, path = '') {
    this._actionUrl = `${actionUrl}${path}`;
  }
  public get actionUrl(): string {
    return this._actionUrl;
  }
  public set actionUrl(value: string) {
    this._actionUrl = value;
  }

  private handleTimeout<T>() {
    return new Observable<T>(obs => obs.error({ error: { message: 'Request timed out' } }));
  }
}
