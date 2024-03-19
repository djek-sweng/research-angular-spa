import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminMovieDetailsComponent } from './components/admin-movie-details/admin-movie-details.component';
import { AdminMovieTableComponent } from './components/admin-movie-table/admin-movie-table.component';
import { AdminUserTableComponent } from './components/admin-user-table/admin-user-table.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminMovieDetailsComponent,
    AdminMovieTableComponent,
    AdminUserTableComponent,
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    // app
    AdminRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class AdminModule {}
