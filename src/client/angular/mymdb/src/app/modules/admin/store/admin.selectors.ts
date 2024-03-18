import { IMovie } from '../../movie/models/movie.model';
import { IAdminUser } from '../models/admin-user.model';
import * as fromApp from '../../../store/app.reducer';

export const selectMovies = (state: fromApp.AppState): IMovie[] => {
  return state.admin.movies;
};

export const selectUsers = (state: fromApp.AppState): IAdminUser[] => {
  return state.admin.users;
};
