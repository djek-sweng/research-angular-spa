import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { MOVIE_ROUTES } from 'src/app/config/routes.config';
import { IMovie } from '../models/movie.model';
import { IList } from '../../shared/models/list.model';
import { ACTION_NOP } from '../../shared/models/action.model';
import { MovieService } from '../services/movie.service';
import * as MovieActions from './movie.actions';

@Injectable()
export class MovieEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpClient: HttpClient,
    private readonly movieService: MovieService
  ) {}

  loadMovies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MovieActions.loadMovies),

        switchMap(() => {
          return this.httpClient.get<IList<IMovie>>(MOVIE_ROUTES.loadMovies, {
            observe: 'response',
          });
        }),

        map((response) => {
          if (response.ok && response.body) {
            this.movieService.setMovies(response.body.items);
            return;
          }
        })
      ),
    { dispatch: false }
  );

  createMovie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MovieActions.createMovie),

        switchMap((props) => {
          const body = props.movie;

          return this.httpClient
            .post<IMovie>(MOVIE_ROUTES.createMovie, body, {
              observe: 'response',
            })
            .pipe(
              map((response) => {
                if (response.ok) {
                  return MovieActions.loadMovies();
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

  updateMovie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MovieActions.updateMovie),

        switchMap((props) => {
          const body = props.movie;

          return this.httpClient
            .post<IMovie>(MOVIE_ROUTES.updateMovie, body, {
              observe: 'response',
            })
            .pipe(
              map((response) => {
                if (response.ok) {
                  return MovieActions.loadMovies();
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
        ofType(MovieActions.deleteMovie),

        switchMap((props) => {
          const movieId = props.id;

          return this.httpClient
            .delete<null>(`${MOVIE_ROUTES.deleteMovie}/${movieId}`, {
              observe: 'response',
            })
            .pipe(
              map((response) => {
                if (response.ok) {
                  return MovieActions.loadMovies();
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
