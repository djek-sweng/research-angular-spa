import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/user.model';
import { IHttpError } from '../../shared/models/http-error.model';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import * as AuthSelectors from '../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signOutTimer: any = null;

  public constructor(private readonly store: Store<fromApp.AppState>) {}

  get user$(): Observable<User | null> {
    return this.store.select(AuthSelectors.selectAuthUser);
  }

  get error$(): Observable<IHttpError | null> {
    return this.store.select(AuthSelectors.selectAuthError);
  }

  get isLoading$(): Observable<boolean> {
    return this.store.select(AuthSelectors.selectAuthIsLoading);
  }

  public signUp(email: string, password: string): void {
    const props = {
      email: email,
      password: password,
    };
    this.store.dispatch(AuthActions.signUpStart(props));
  }

  public signIn(email: string, password: string): void {
    const props = {
      email: email,
      password: password,
    };
    this.store.dispatch(AuthActions.signInStart(props));
  }

  public autoSignIn(): void {
    this.store.dispatch(AuthActions.autoSignIn());
  }

  public signOut(): void {
    this.store.dispatch(AuthActions.signOut());
  }

  public resetError(): void {
    this.store.dispatch(AuthActions.resetError());
  }

  public setSignOutTimer(expirationDelay: number): void {
    this.signOutTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.signOut());
    }, expirationDelay);
  }

  public clearSignOutTimer(): void {
    if (this.signOutTimer) {
      clearTimeout(this.signOutTimer);
    }
    this.signOutTimer = null;
  }
}
