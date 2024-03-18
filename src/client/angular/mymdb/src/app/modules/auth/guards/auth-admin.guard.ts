import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { User } from '../../shared/models/user.model';

export const AuthAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const urlTree = inject(Router).createUrlTree(['/auth']);

  return inject(AuthService).user$.pipe(
    take(1),
    map((user: User | null) => {
      const isAuthorized = user?.hasRole('admin');

      if (isAuthorized) {
        return true;
      }

      return urlTree;
    })
  );
};
