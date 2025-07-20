import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    const mockUrlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(mockUrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
  });

  it('debería permitir el acceso si el usuario está autenticado', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = authGuard(null as any, null as any);

    expect(result).toBeTrue();
    expect(routerSpy.createUrlTree).not.toHaveBeenCalled();
  });

  it('debería redirigir a /login si el usuario no está autenticado', () => {
    const mockTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(mockTree);
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = authGuard(null as any, null as any);

    expect(result).toBe(mockTree);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
