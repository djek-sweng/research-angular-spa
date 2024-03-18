import { createAction, props } from '@ngrx/store';

import { IMovie } from '../../movie/models/movie.model';
import { IAdminUser } from '../models/admin-user.model';

/**
 * LOAD_MOVIES
 */
export const loadMovies = createAction('[Admin] Load Movies');

/**
 * UPDATE_MOVIE
 */
export const updateMovie = createAction(
  '[Admin] Update Movie',
  props<{ movie: IMovie }>()
);

/**
 * SET_MOVIES
 */
export const setMovies = createAction(
  '[Admin] Set Movies',
  props<{ movies: IMovie[] }>()
);

/**
 * DELETE_MOVIE
 */
export const deleteMovie = createAction(
  '[Admin] Delete Movie',
  props<{ id: string }>()
);

/**
 * LOAD_USERS
 */
export const loadUsers = createAction('[Admin] Load Users');

/**
 * SET_USERS
 */
export const setUsers = createAction(
  '[Admin] Set Users',
  props<{ users: IAdminUser[] }>()
);

/**
 * DELETE_USER
 */
export const deleteUser = createAction(
  '[Admin] Delete User',
  props<{ id: string }>()
);
