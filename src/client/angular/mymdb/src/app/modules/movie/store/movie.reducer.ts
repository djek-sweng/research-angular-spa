import { createReducer, on } from '@ngrx/store';

import { IMovie } from '../models/movie.model';
import * as MovieActions from './movie.actions';

export interface State {
  movies: IMovie[];
}

const initialState: State = {
  movies: [],
};

export const movieReducer = createReducer(
  initialState,

  on(MovieActions.setMovies, (current, props) => {
    const next: State = {
      ...current,
      movies: props.movies,
    };

    return next;
  })
);
