import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';

import { AdminMovieService } from '../services/admin-movie.service';
import { IMovie } from '../../movie/models/movie.model';

export interface IAdminMovieResolve {
  movie: IMovie | null;
}

export const adminMovieResolver: ResolveFn<IAdminMovieResolve> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<IAdminMovieResolve>
  | Promise<IAdminMovieResolve>
  | IAdminMovieResolve => {
  return GetAdminMovieUseCase.create().execute(route);
};

class GetAdminMovieUseCase {
  private readonly adminMovieService;
  private readonly router;

  private constructor() {
    this.adminMovieService = inject(AdminMovieService);
    this.router = inject(Router);
  }

  public static create() {
    return new GetAdminMovieUseCase();
  }

  public execute(
    route: ActivatedRouteSnapshot
  ): Observable<IAdminMovieResolve> {
    let movie: IMovie | null = null;

    return this.adminMovieService.getMovies$().pipe(
      map((movies) => {
        if (movies.length < 1) {
          this.adminMovieService.loadMovies();
        }

        const id = route.paramMap.get('id');
        if (!id) {
          throw new Error('No such parameter.');
        }

        this.adminMovieService.getMovie$(id).subscribe((m) => (movie = m));

        if (movie) {
          return { movie: movie };
        }

        this.router.navigate(['/movie']);

        return { movie: null };
      })
    );
  }
}
