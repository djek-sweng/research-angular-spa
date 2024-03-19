import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap((user) => {
        /**
         * If no user is authenticated, then next without any changes.
         */
        if (user == null) {
          return next.handle(req);
        }

        /**
         * If a user is authenticated, then add Bearer token to all request headers.
         */
        let headers = req.headers;
        headers = headers.append('Authorization', 'Bearer ' + user.token);

        const modifiedRequest = req.clone({
          headers: headers,
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}
