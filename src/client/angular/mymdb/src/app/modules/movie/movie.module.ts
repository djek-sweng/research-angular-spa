import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MovieComponent } from './components/movie/movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieListItemComponent } from './components/movie-list-item/movie-list-item.component';
import { MovieAddComponent } from './components/movie-add/movie-add.component';
import { MovieRoutingModule } from './movie-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
    MovieListItemComponent,
    MovieAddComponent,
    MovieDetailsComponent,
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    // app
    MovieRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class MovieModule {}
