import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, filter, take, switchMap, mergeMap } from 'rxjs/operators';
import { Helpers } from 'src/app/app.helpers';
import { AuthService } from '../services/auth.service';
import { LocalStorageKey } from '../enums/local-storage-keys.enum';
import { Pages } from '../enums/pages.enum';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  newToken: any;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private helpers: Helpers, private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {

        if (error.error instanceof ErrorEvent) {
          this.helpers.dismissLoader();
          // A client-side or network error occurred. Mostly network.
          console.error('An error occurred:', error.error);
          this.helpers.createAlert('Please check your network settings and try again.', 'Network Error!', null, 'ios')
            .then((alert) => alert.present());
        } else {
          console.error('Intercept error occurred:', error.error);
          if (error.status === 401) {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(req)))
              );
            } else {
              this.refreshTokenInProgress = true;

              // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
              this.refreshTokenSubject.next(null);

              return this.refreshTokens()
                .pipe(
                  switchMap((res) => {
                    this.storeTokens(res.data);
                    // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                    // for the next time the token needs to be refreshed
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(res.data.accessToken);
                    return next.handle(this.addAuthenticationToken(req));
                  }),
                  catchError(tokenError => {
                    this.refreshTokenInProgress = false;
                    // this.event.publish('auth:logout');
                    console.error(tokenError);
                    this.helpers.dismissLoader();
                    this.auth.logout();
                    this.helpers.setRoot(Pages.home);
                    return throwError('tokenError');
                  }));
            }
          } else {
            this.helpers.createErrorToast(error.error.message || 'Oops! an error occurred. Please try again later');
          }

        }

        return throwError(error.error);
      }));
  }

  refreshTokens() {

    return from(Promise.all([this.helpers.get(LocalStorageKey.refreshToken)]))
      .pipe(
        mergeMap((val) => {
          console.log(val);
          const refreshToken = val[0];
          if (refreshToken) {
            return this.auth.refreshToken(refreshToken);
          }
          return throwError('Session Expired');
        }));
  }

  storeTokens(data) {
    this.newToken = data.accessToken;
    this.helpers.save(LocalStorageKey.accessToken, data.accessToken);
    this.helpers.save(LocalStorageKey.refreshToken, data.refreshToken);

  }

  addAuthenticationToken(req) {
    const headers = req.headers
      .set('Authorization', `Bearer ${this.newToken}`);
    const authReq = req.clone({ headers });
    return authReq;
  }
}
