import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

/**
 * autorizacion de autenticación
 * @returns -> true si el usuario está autenticado, de lo contrario redirige a /login
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuth = authService.isAuthenticated();
  if (isAuth) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
