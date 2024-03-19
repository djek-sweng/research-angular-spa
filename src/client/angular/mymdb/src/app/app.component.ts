import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './modules/auth/services/auth.service';
import { InitialisationService } from './modules/shared/services/initialisation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscribtion = new Subscription();

  constructor(
    private readonly authService: AuthService,
    private readonly initialisationService: InitialisationService
  ) {}

  ngOnInit(): void {
    this.authService.autoSignIn();
    this.subscribtion = this.initialisationService.initDatabase$().subscribe();
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
