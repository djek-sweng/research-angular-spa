import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    // app
    AuthRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class AuthModule {}
