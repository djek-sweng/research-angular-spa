import { createAction, props } from '@ngrx/store';

import { User } from '../../shared/models/user.model';
import { IHttpError } from '../../shared/models/http-error.model';

/**
 * SIGN_UP_START
 */
export const signUpStart = createAction(
  '[Auth] Sign Up Start',
  props<{ email: string; password: string }>()
);

/**
 * AUTO_SIGN_IN
 */
export const autoSignIn = createAction('[Auth] Auto Sign In');

/**
 * SIGN_IN_START
 */
export const signInStart = createAction(
  '[Auth] Sign In Start',
  props<{ email: string; password: string }>()
);

/**
 * AUTHENTICATE_SUCCESS
 */
export const authenticateSuccess = createAction(
  '[Auth] Authenticate Success',
  props<{ user: User; redirect: boolean }>()
);

/**
 * AUTHENTICATE_ERROR
 */
export const authenticateError = createAction(
  '[Auth] Authenticate Error',
  props<{ error: IHttpError }>()
);

/**
 * SIGN_OUT
 */
export const signOut = createAction('[Auth] Sign Out');

/**
 * RESET_ERROR
 */
export const resetError = createAction('[Auth] Reset Error');
