import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorGenericComponent } from './components/error-generic/error-generic.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [ErrorGenericComponent],
  imports: [
    // angular
    CommonModule,
    RouterModule,
    // app
    ErrorRoutingModule,
  ],
  exports: [],
})
export class ErrorModule {}
