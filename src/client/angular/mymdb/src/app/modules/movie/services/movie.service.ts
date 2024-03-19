import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { IMovie } from '../models/movie.model';
import * as MovieActions from '../store/movie.actions';
import * as MovieSelectors from '../store/movie.selectors';
import * as fromApp from '../../../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public constructor(private readonly store: Store<fromApp.AppState>) {}

  public loadMovies(): void {
    this.store.dispatch(MovieActions.loadMovies());
  }

  public createMovie(movie: IMovie): void {
    this.store.dispatch(MovieActions.createMovie({ movie: movie }));
  }

  public updateMovie(movie: IMovie): void {
    this.store.dispatch(MovieActions.updateMovie({ movie: movie }));
  }

  public getMovies$(): Observable<IMovie[]> {
    return this.store.select(MovieSelectors.selectMovies);
  }

  public getMovie$(id: string): Observable<IMovie | null> {
    return this.getMovies$().pipe(
      map((movies) => {
        const movie = movies.find((m) => m.id === id);

        if (movie) {
          return movie;
        }

        return null;
      })
    );
  }

  public setMovies(movies: IMovie[]): void {
    this.store.dispatch(MovieActions.setMovies({ movies: movies }));
  }

  public deleteMovie(id: string): void {
    this.store.dispatch(MovieActions.deleteMovie({ id: id }));
  }
}
