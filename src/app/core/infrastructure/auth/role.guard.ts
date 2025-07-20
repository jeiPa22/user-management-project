import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRole } from '../../shared/constants/role.enum';
import { AuthService } from '../../application/auth/services/auth.service';

export const roleGuard: CanActivateFn = (
  route,
  state
): boolean | Observable<boolean> => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'] as UserRole;

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const role = auth.getUserRole();
  if (role !== expectedRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
