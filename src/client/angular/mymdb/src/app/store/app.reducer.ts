import { ActionReducerMap } from '@ngrx/store';

import * as fromAdmin from './../modules/admin/store/admin.reducer';
import * as fromAuth from './../modules/auth/store/auth.reducer';
import * as fromMovie from './../modules/movie/store/movie.reducer';

export interface AppState {
  admin: fromAdmin.State;
  auth: fromAuth.State;
  movie: fromMovie.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  admin: fromAdmin.adminReducer,
  auth: fromAuth.authReducer,
  movie: fromMovie.movieReducer,
};
