import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './modules/auth/services/auth-interceptor.service';

@NgModule({
  providers: [
    /**
     * The provided http interceptors are executed in the given order.
     */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
