import { createAction, props } from '@ngrx/store';

import { IMovie } from '../models/movie.model';

/**
 * LOAD_MOVIES
 */
export const loadMovies = createAction('[Movie] Load Movies');

/**
 * CREATE_MOVIE
 */
export const createMovie = createAction(
  '[Movie] Create Movie',
  props<{ movie: IMovie }>()
);

/**
 * UPDATE_MOVIE
 */
export const updateMovie = createAction(
  '[Movie] Update Movie',
  props<{ movie: IMovie }>()
);

/**
 * SET_MOVIES
 */
export const setMovies = createAction(
  '[Movie] Set Movies',
  props<{ movies: IMovie[] }>()
);

/**
 * DELETE_MOVIE
 */
export const deleteMovie = createAction(
  '[Movie] Delete Movie',
  props<{ id: string }>()
);
