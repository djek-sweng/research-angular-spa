import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ADMIN_ROUTES } from 'src/app/config/routes.config';
import { IList } from '../../shared/models/list.model';
import { IMovie } from '../../movie/models/movie.model';
import { IAdminUser } from '../models/admin-user.model';
import { ACTION_NOP } from '../../shared/models/action.model';
import { AdminMovieService } from '../services/admin-movie.service';
import { AdminUserService } from '../services/admin-user.service';
import * as AdminActions from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpClient: HttpClient,
    private readonly adminMovieService: AdminMovieService,
    private readonly adminUserService: AdminUserService
  ) {}

  loadMovies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.loadMovies),

        switchMap(() => {
          return this.httpClient.get<IList<IMovie>>(ADMIN_ROUTES.loadMovies, {
            observe: 'response',
          });
        }),

        map((response) => {
          if (response.ok && response.body) {
            this.adminMovieService.setMovies(response.body.items);
            return;
          }
        })
      ),
    { dispatch: false }
  );

  updateMovie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.updateMovie),

        switchMap((props) => {
          const body = props.movie;

          return this.httpClient
            .post<IMovie>(ADMIN_ROUTES.updateMovie, body, {
              observe: 'response',
            })
            .pipe(
              map((response) => {
                if (response.ok) {
                  return AdminActions.loadMovies();
                }

                return ACTION_NOP;
              }),

              catchError(() => {
                return of(ACTION_NOP);
              })
            );
        })
      ),
    { dispatch: true }
  );

  deleteMovie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteMovie),

        switchMap((props) => {
          const movieId = props.id;

          return this.httpClient
            .delete<null>(`${ADMIN_ROUTES.deleteMovie}/${movieId}`, {
              observe: 'response',
            })
            .pipe(
              map((response) => {
                if (response.ok) {
                  return AdminActions.loadMovies();
                }

                return ACTION_NOP;
              }),

              catchError(() => {
                return of(ACTION_NOP);
              })
            );
        })
      ),
    { dispatch: true }
  );

  loadUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.loadUsers),

        switchMap(() => {
          return this.httpClient.get<IList<IAdminUser>>(
            ADMIN_ROUTES.loadUsers,
            {
              observe: 'response',
            }
          );
        }),

        map((response) => {
          if (response.ok && response.body) {
            this.adminUserService.setUsers(response.body.items);
            return;
          }
        })
      ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteUser),

        switchMap((props) => {
          const userId = props.id;

          return this.httpClient
            .delete<null>(`${ADMIN_ROUTES.deleteUser}/${userId}`, {
              observe: 'response',
            })
            .pipe(
              map((response) => {
                if (response.ok) {
                  return AdminActions.loadUsers();
                }

                return ACTION_NOP;
              }),

              catchError(() => {
                return of(ACTION_NOP);
              })
            );
        })
      ),
    { dispatch: true }
  );
}
