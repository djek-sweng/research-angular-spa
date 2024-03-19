import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthAdminGuard } from '../auth/guards/auth-admin.guard';

import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminMovieDetailsComponent } from './components/admin-movie-details/admin-movie-details.component';
import { AdminMovieTableComponent } from './components/admin-movie-table/admin-movie-table.component';
import { AdminUserTableComponent } from './components/admin-user-table/admin-user-table.component';

import { adminMovieResolver } from './resolvers/admin-movie.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      {
        path: 'movie',
        component: AdminMovieTableComponent,
      },
      {
        path: 'movie/:id/details',
        component: AdminMovieDetailsComponent,
        resolve: { result: adminMovieResolver },
      },
      {
        path: 'movie/:id',
        redirectTo: 'movie/:id/details',
        resolve: { result: adminMovieResolver },
      },
      {
        path: 'user',
        component: AdminUserTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
