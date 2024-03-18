import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthUserGuard } from '../auth/guards/auth-user.guard';
import { MovieComponent } from './components/movie/movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { movieResolver } from './resolvers/movie.resolver';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
    canActivate: [AuthGuard, AuthUserGuard],
    children: [
      { path: '', component: MovieListComponent },
      {
        path: ':id/details',
        component: MovieDetailsComponent,
        resolve: { result: movieResolver },
      },
      {
        path: ':id',
        redirectTo: ':id/details',
        resolve: { result: movieResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
