import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LocalStorageKey } from '../enums/local-storage-keys.enum';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  token: string;
  constructor(private storage: Storage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.getToken()).pipe(
      mergeMap(token => {
        const headers = req.headers
          .set('Authorization', `Bearer ${token}`);
        const authReq = req.clone({ headers });
        return next.handle(authReq);
      }));
  }

  getToken(): Promise<string> {
    return this.storage.get(LocalStorageKey.accessToken);
  }
}
