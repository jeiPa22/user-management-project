import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserRole } from '../../../shared/constants/role.enum';
import {
  IAuthCredentialsDto,
  IAuthResultDto,
} from '../../../shared/dtos/auth.dto';

/**
 * Servicio de autenticación que simula un backend
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Credenciales de administrador y cajero
   */
  private readonly adminCredentials = {
    username: 'Admin',
    password: 'LealAdmin',
    role: UserRole.Admin,
  };

  /**
   * Credenciales de cajero
   */
  private readonly cashierCredentials = {
    username: 'Cajero',
    password: 'LealCajero',
    role: UserRole.Cashier,
  };

  /**
   * Autentica al usuario con las credenciales proporcionadas
   * @param credentials -> Credenciales del usuario
   * @returns -> resultado de la autenticación.
   */
  authenticate(credentials: IAuthCredentialsDto): Observable<IAuthResultDto> {
    if (
      credentials.username === this.adminCredentials.username &&
      credentials.password === this.adminCredentials.password
    ) {
      const result = { success: true, role: this.adminCredentials.role };
      localStorage.setItem('auth', JSON.stringify(result));
      return of(result);
    }

    if (
      credentials.username === this.cashierCredentials.username &&
      credentials.password === this.cashierCredentials.password
    ) {
      const result = { success: true, role: this.cashierCredentials.role };
      localStorage.setItem('auth', JSON.stringify(result));
      return of(result);
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  /**
   * Devuelve true si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth');
  }

  /**
   * Devuelve el rol del usuario autenticado
   */
  getUserRole(): UserRole | undefined {
    const data = localStorage.getItem('auth');
    if (!data) return undefined;
    return JSON.parse(data).role;
  }

  /**
   * Limpia la sesión
   */
  logout(): void {
    localStorage.removeItem('auth');
  }
}
