import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { IToken, TOKEN_EMTPY } from '../../models/token.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignInMode = true;
  isLoading = false;
  errorMessage = '';
  token: IToken = TOKEN_EMTPY;

  private closeSubscription: Subscription | undefined;
  private isLoadingSubscription: Subscription | undefined;
  private errorSubscription: Subscription | undefined;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isLoadingSubscription = this.authService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.errorSubscription = this.authService.error$.subscribe((error) => {
      this.errorMessage = '';
      if (error?.key && error?.message) {
        this.errorMessage = `[${error?.key}] ${error?.message}`;
      }
    });
  }

  ngOnDestroy(): void {
    this.closeSubscription?.unsubscribe();
    this.isLoadingSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isSignInMode) {
      this.authService.signIn(email, password);
    } else {
      this.authService.signUp(email, password);
    }

    form.reset();
  }

  onSwitchMode(): void {
    this.isSignInMode = !this.isSignInMode;
  }

  onCloseErrorMessage(): void {
    this.authService.resetError();
  }
}
