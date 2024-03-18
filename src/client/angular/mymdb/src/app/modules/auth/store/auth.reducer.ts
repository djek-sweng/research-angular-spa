import { createReducer, on } from '@ngrx/store';

import { User } from '../../shared/models/user.model';
import { IHttpError } from '../../shared/models/http-error.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
  error: IHttpError | null;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.signUpStart, AuthActions.signInStart, (current) => {
    const next: State = {
      ...current,
      error: null,
      isLoading: true,
    };

    return next;
  }),

  on(AuthActions.authenticateSuccess, (current, props) => {
    const next: State = {
      ...current,
      user: props.user,
      error: null,
      isLoading: false,
    };

    return next;
  }),

  on(AuthActions.authenticateError, (current, props) => {
    const next: State = {
      ...current,
      user: null,
      error: props.error,
      isLoading: false,
    };

    return next;
  }),

  on(AuthActions.resetError, (current) => {
    const next: State = {
      ...current,
      error: null,
    };

    return next;
  }),

  on(AuthActions.signOut, (current) => {
    const next: State = {
      ...current,
      user: null,
      error: null,
      isLoading: false,
    };

    return next;
  })
);
