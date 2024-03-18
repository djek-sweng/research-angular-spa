import { Component, Input } from '@angular/core';

import { IMovie, MOVIE_EMTPY } from '../../models/movie.model';
import { getDifferenceInDaysToNow } from '../../../shared/functions/shared.functions';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.css'],
})
export class MovieListItemComponent {
  @Input() movie: IMovie = MOVIE_EMTPY;

  getLastUpdated(): string {
    const diff = getDifferenceInDaysToNow(this.movie.updatedAt);

    return diff > 0 ? `Last updated ${diff} days ago` : 'Last updated today';
  }

  getDescription(): string | undefined {
    return this.movie.description?.slice(0, 100);
  }
}
