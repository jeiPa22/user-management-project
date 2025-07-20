// src/app/core/application/auth/use-cases/is-user-authenticated.use-case.ts
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IsUserAuthenticatedUseCase {
  execute(): Observable<boolean> {
    const authDataString = localStorage.getItem('auth');
    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        return of(authData.success === true);
      } catch (e) {
        console.error('Error no auth:', e);
        return of(false);
      }
    }
    return of(false);
  }
}
