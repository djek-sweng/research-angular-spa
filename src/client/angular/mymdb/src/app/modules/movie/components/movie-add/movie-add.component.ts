import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css'],
})
export class MovieAddComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  constructor(private readonly movieService: MovieService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const movie: IMovie = {
      title: form.value.title,
      description: form.value.description,
      rating: form.value.rating,
      imageUrl: form.value.imageUrl,
    };

    this.movieService.createMovie(movie);

    this.close.emit();

    form.reset();
  }

  onCancel(form: NgForm) {
    this.close.emit();

    form.reset();
  }
}
