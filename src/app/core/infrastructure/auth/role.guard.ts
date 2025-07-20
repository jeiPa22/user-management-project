import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../../shared/constants/role.enum';
import { AuthService } from './services/auth.service';

/**
 * Guarda de roles que verifica si el usuario tiene el rol esperado
 * @param route -> Ruta que contiene el rol esperado
 * @returns -> true si el usuario tiene el rol esperado, de lo contrario redirige a /login
 */
export const roleGuard: CanActivateFn = (
  route
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
