import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies$ = new Observable<IMovie[]>();
  isAddMode = false;

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.loadMovies();
    this.movies$ = this.movieService.getMovies$();
  }

  onAdd(): void {
    this.isAddMode = true;
  }

  onCloseAdd(): void {
    this.isAddMode = false;
  }
}
