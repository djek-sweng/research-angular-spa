import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppEffects } from './store/app.effects';
import { AdminEffects } from './modules/admin/store/admin.effects';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { MovieEffects } from './modules/movie/store/movie.effects';
import * as fromApp from '../app/store/app.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,
    HttpClientModule,
    // ngrx
    StoreModule.forRoot(fromApp.appReducer, {}),
    EffectsModule.forRoot([
      AppEffects,
      AdminEffects,
      AuthEffects,
      MovieEffects,
    ]),
    StoreDevtoolsModule.instrument({ logOnly: false }),
    // app (eager loading)
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
