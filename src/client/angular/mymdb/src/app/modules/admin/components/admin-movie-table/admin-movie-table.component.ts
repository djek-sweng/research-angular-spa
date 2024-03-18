import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AdminMovieService } from '../../services/admin-movie.service';
import { IMovie } from 'src/app/modules/movie/models/movie.model';

@Component({
  selector: 'app-admin-movie-table',
  templateUrl: './admin-movie-table.component.html',
  styleUrls: ['./admin-movie-table.component.css'],
})
export class AdminMovieTableComponent implements OnInit {
  movies$ = new Observable<IMovie[]>();

  constructor(
    private readonly adminMovieService: AdminMovieService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.adminMovieService.loadMovies();
    this.movies$ = this.adminMovieService.getMovies$();
  }

  OnEdit(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.router.navigate(['/admin', 'movie', id, 'details']);
  }

  OnDelete(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.adminMovieService.deleteMovie(id);
  }
}
