import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    BackdropComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    BackdropComponent,
  ],
})
export class SharedModule {}
