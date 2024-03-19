import { Injectable } from '@angular/core';

import { IUserStorage, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly userKey: string = 'user';

  public setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public getUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);

    if (userJson == null) {
      return null;
    }

    const userStorage: IUserStorage = JSON.parse(userJson);

    return User.createFromStorage(userStorage);
  }

  public removeUser(): void {
    localStorage.removeItem(this.userKey);
  }
}
