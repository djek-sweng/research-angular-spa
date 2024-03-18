import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAdminUser } from '../models/admin-user.model';
import * as AdminActions from '../store/admin.actions';
import * as AdminSelectors from '../store/admin.selectors';
import * as fromApp from '../../../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  public constructor(private readonly store: Store<fromApp.AppState>) {}

  public loadUsers(): void {
    this.store.dispatch(AdminActions.loadUsers());
  }

  public getUsers$(): Observable<IAdminUser[]> {
    return this.store.select(AdminSelectors.selectUsers);
  }

  public setUsers(users: IAdminUser[]): void {
    this.store.dispatch(AdminActions.setUsers({ users: users }));
  }

  public deleteUser(id: string): void {
    this.store.dispatch(AdminActions.deleteUser({ id: id }));
  }
}
