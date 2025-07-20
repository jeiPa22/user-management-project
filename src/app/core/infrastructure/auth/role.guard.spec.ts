// src/app/core/infrastructure/auth/role.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { roleGuard } from './role.guard';
import { AuthService } from './services/auth.service';
import { UserRole } from '../../shared/constants/role.enum';

describe('roleGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
      'getUserRole',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
  });

  const makeRouteMock = (expectedRole: UserRole) =>
    ({ data: { expectedRole } } as any);

  it('debería permitir acceso si el usuario tiene el rol esperado', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.getUserRole.and.returnValue(UserRole.Admin);

    const result = roleGuard(makeRouteMock(UserRole.Admin), null as any);

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('debería redirigir si el usuario no está autenticado', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = roleGuard(makeRouteMock(UserRole.Admin), null as any);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería redirigir si el usuario tiene un rol incorrecto', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.getUserRole.and.returnValue(UserRole.Cashier);

    const result = roleGuard(makeRouteMock(UserRole.Admin), null as any);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
