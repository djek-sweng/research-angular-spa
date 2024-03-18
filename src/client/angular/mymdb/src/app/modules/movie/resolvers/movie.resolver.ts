import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';

import { MovieService } from '../services/movie.service';
import { IMovie } from '../models/movie.model';

export interface IMovieResolve {
  movie: IMovie | null;
}

export const movieResolver: ResolveFn<IMovieResolve> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<IMovieResolve> | Promise<IMovieResolve> | IMovieResolve => {
  return GetMovieUseCase.create().execute(route);
};

class GetMovieUseCase {
  private readonly movieService;
  private readonly router;

  private constructor() {
    this.movieService = inject(MovieService);
    this.router = inject(Router);
  }

  public static create() {
    return new GetMovieUseCase();
  }

  public execute(route: ActivatedRouteSnapshot): Observable<IMovieResolve> {
    let movie: IMovie | null = null;

    return this.movieService.getMovies$().pipe(
      map((movies) => {
        if (movies.length < 1) {
          this.movieService.loadMovies();
        }

        const id = route.paramMap.get('id');
        if (!id) {
          throw new Error('No such parameter.');
        }

        this.movieService.getMovie$(id).subscribe((m) => (movie = m));

        if (movie) {
          return { movie: movie };
        }

        this.router.navigate(['/movie']);

        return { movie: null };
      })
    );
  }
}
