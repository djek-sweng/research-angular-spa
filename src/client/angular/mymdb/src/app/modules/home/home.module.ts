import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    // angular
    CommonModule,
    RouterModule,
    // app
    HomeRoutingModule,
  ],
  exports: [],
})
export class HomeModule {}
