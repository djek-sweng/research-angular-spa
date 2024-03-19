import { createReducer, on } from '@ngrx/store';

import { IMovie } from '../../movie/models/movie.model';
import { IAdminUser } from '../models/admin-user.model';
import * as AdminActions from './admin.actions';

export interface State {
  movies: IMovie[];
  users: IAdminUser[];
}

const initialState: State = {
  movies: [],
  users: [],
};

export const adminReducer = createReducer(
  initialState,

  on(AdminActions.setMovies, (current, props) => {
    const next: State = {
      ...current,
      movies: props.movies,
    };

    return next;
  }),

  on(AdminActions.setUsers, (current, props) => {
    const next: State = {
      ...current,
      users: props.users,
    };

    return next;
  })
);
