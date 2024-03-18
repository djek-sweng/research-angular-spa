import { IMovie } from '../models/movie.model';
import * as fromApp from '../../../store/app.reducer';

export const selectMovies = (state: fromApp.AppState): IMovie[] => {
  return state.movie.movies;
};
