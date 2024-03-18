import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { IMovie } from '../../movie/models/movie.model';
import * as AdminActions from '../store/admin.actions';
import * as AdminSelectors from '../store/admin.selectors';
import * as fromApp from '../../../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AdminMovieService {
  public constructor(private readonly store: Store<fromApp.AppState>) {}

  public loadMovies(): void {
    this.store.dispatch(AdminActions.loadMovies());
  }

  public getMovies$(): Observable<IMovie[]> {
    return this.store.select(AdminSelectors.selectMovies);
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
    this.store.dispatch(AdminActions.setMovies({ movies: movies }));
  }

  public deleteMovie(id: string): void {
    this.store.dispatch(AdminActions.deleteMovie({ id: id }));
  }

  public updateMovie(movie: IMovie): void {
    this.store.dispatch(AdminActions.updateMovie({ movie: movie }));
  }
}
