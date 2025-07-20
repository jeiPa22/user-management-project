// src/app/core/infrastructure/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IsUserAuthenticatedUseCase } from '../../application/auth/use-cases/is-user-authenticated.use-case';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const router = inject(Router);
  const isUserAuthenticatedUseCase = inject(IsUserAuthenticatedUseCase);

  return isUserAuthenticatedUseCase.execute().pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
