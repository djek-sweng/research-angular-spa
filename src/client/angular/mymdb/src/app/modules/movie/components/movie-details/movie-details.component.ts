import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IMovieResolve } from '../../resolvers/movie.resolver';
import { IMovie, MOVIE_EMTPY } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy, IMovieResolve {
  movie: IMovie = MOVIE_EMTPY;
  fg: FormGroup = new FormGroup({});

  private subscription: Subscription | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      const resolve = data['result'] as IMovieResolve;

      if (resolve.movie !== null) {
        this.movie = resolve.movie;
      }

      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onDelete(): void {
    const movieId = this.movie?.id;

    if (!movieId) {
      return;
    }

    this.movieService.deleteMovie(movieId);

    this.navigateAway();
  }

  onCancel(): void {
    this.navigateAway();
  }

  onSubmit(): void {
    const movie = {
      id: this.movie.id,
      title: this.fg.value['title'],
      description: this.fg.value['description'],
      rating: this.fg.value['rating'],
      imageUrl: this.fg.value['imageUrl'],
    } as IMovie;

    this.movieService.updateMovie(movie);

    this.navigateAway();
  }

  private initForm(): void {
    this.fg = new FormGroup({
      'title': new FormControl(
        this.movie.title,
        [Validators.required]
      ),
      'imageUrl': new FormControl(
        this.movie.imageUrl,
        [Validators.required]
      ),
      'description': new FormControl(
        this.movie.description
      ),
      'rating': new FormControl(
        this.movie.rating,
        [Validators.required]
      ),
      'updatedAt': new FormControl(
        {value: this.movie.updatedAt, disabled: true}
      ),
    });
  }

  private navigateAway(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
