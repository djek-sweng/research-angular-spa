import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isAuthorizedUser = false;
  isAuthorizedAdmin = false;
  email = '';

  private userSubscription: Subscription | undefined;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
      this.isAuthorizedUser = user?.hasRole('user') ? true : false;
      this.isAuthorizedAdmin = user?.hasRole('admin') ? true : false;
      this.email = user ? user.email : '';
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
