import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { IDENTITY_ROUTES } from 'src/app/config/routes.config';
import { AuthService } from '../services/auth.service';
import { IToken } from '../models/token.model';
import { StorageService } from '../../shared/services/storage.service';
import { IHttpError } from '../../shared/models/http-error.model';
import { User } from '../../shared/models/user.model';
import { ACTION_NOP } from '../../shared/models/action.model';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  logAuthenticateError$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.authenticateError),
      tap((props) => {
        console.log(props.error);
      })
    ),
    { dispatch: false }
  );

  signUp$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.signUpStart),
      switchMap(
        (props) => {
          return this.httpClient.post<IToken>(
            IDENTITY_ROUTES.signUp,
            {
              email: props.email,
              password: props.password
            })
            .pipe(
              map(
                (token) => {
                  return this.getAuthenticateSuccessFromToken(token, true);
                }
              ),
              catchError(
                (error) => {
                  return of(this.getAuthenticateError(error));
                }
              )
            )
        }
      )
    ),
    { dispatch: true }
  );

  signIn$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.signInStart),
      switchMap(
        (props) => {
          return this.httpClient.post<IToken>(
            IDENTITY_ROUTES.signIn,
            {
              email: props.email,
              password: props.password
            })
            .pipe(
              map(
                (token) => {
                  return this.getAuthenticateSuccessFromToken(token, true);
                }
              ),
              catchError(
                (error) => {
                  return of(this.getAuthenticateError(error));
                }
              )
            )
        }
      )
    ),
    { dispatch: true }
  );

  autoSignIn$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.autoSignIn),
      map(() => {
        const user = this.storageService.getUser();

        if (user == null
            || user.token == null) {
          return ACTION_NOP;
        }

        return this.getAuthenticateSuccessFromUser(user, false);
      })
    ),
    { dispatch: true }
  );

  signOut$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.signOut),
      tap(() => {
        this.storageService.removeUser();
        this.authService.clearSignOutTimer();

        this.router.navigate(['/auth']);
      })
    ),
    { dispatch: false }
  );

  authenticateSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.authenticateSuccess),
      tap((props) => {
        const user = props.user;
        const expirationDelay = user.tokenExpirationDelay;
        const redirect = props.redirect;

        this.storageService.setUser(user);
        this.authService.setSignOutTimer(expirationDelay);

        if (redirect) {
          this.router.navigate(['/']);
        }

        console.log(`Auth token expires in ${expirationDelay/1000} sec.`);
      })
    ),
    { dispatch: false }
  );

  private getAuthenticateSuccessFromToken(token: IToken, redirect: boolean) {
    const user = User.createFromToken(token);

    return this.getAuthenticateSuccessFromUser(user, redirect);
  }

  private getAuthenticateSuccessFromUser(user: User, redirect: boolean) {
    const props = {
      user: user,
      redirect: redirect
    };

    return AuthActions.authenticateSuccess(props);
  }

  private getAuthenticateError(error: HttpErrorResponse) {
    const httpError = error.error as IHttpError;

    const props = {
      error: httpError
    };

    return AuthActions.authenticateError(props);
  }
}
