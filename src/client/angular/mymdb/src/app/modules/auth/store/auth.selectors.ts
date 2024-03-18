import { IHttpError } from '../../shared/models/http-error.model';
import { User } from '../../shared/models/user.model';
import * as fromApp from '../../../store/app.reducer';

export const selectAuthUser = (state: fromApp.AppState): User | null => {
  return state.auth.user;
};

export const selectAuthError = (state: fromApp.AppState): IHttpError | null => {
  return state.auth.error;
};

export const selectAuthIsLoading = (state: fromApp.AppState): boolean => {
  return state.auth.isLoading;
};
