import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { roleGuard } from './role.guard';
import { AuthService } from './services/auth.service';
import { UserRole } from '../../shared/constants/role.enum';

class MockAuthService {
  isAuthenticated = jasmine.createSpy('isAuthenticated');
  getUserRole = jasmine.createSpy('getUserRole');
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('roleGuard', () => {
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    });

    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  it('debería redirigir a /login y retornar false si el usuario no está autenticado', () => {
    authService.isAuthenticated.and.returnValue(false);

    const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
      data: { expectedRole: UserRole.Admin },
      outlet: 'primary',
      component: null,
      routeConfig: null,
      root: null as any,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      paramMap: of({} as any) as any,
      queryParamMap: of({} as any) as any,
      title: undefined,
    };

    const mockRouterStateSnapshot: RouterStateSnapshot = {
      url: '/',
      root: mockActivatedRouteSnapshot,
    };

    const result = TestBed.runInInjectionContext(() =>
      roleGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
    );

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('debería redirigir a /login y retornar false si el rol del usuario no coincide con el esperado', () => {
    authService.isAuthenticated.and.returnValue(true);
    authService.getUserRole.and.returnValue(UserRole.Cashier);

    const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
      data: { expectedRole: UserRole.Admin },
      outlet: 'primary',
      component: null,
      routeConfig: null,
      root: null as any,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      paramMap: of({} as any) as any,
      queryParamMap: of({} as any) as any,
      title: undefined,
    };

    const mockRouterStateSnapshot: RouterStateSnapshot = {
      url: '/',
      root: mockActivatedRouteSnapshot,
    };

    const result = TestBed.runInInjectionContext(() =>
      roleGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
    );

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getUserRole).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('debería retornar true y no redirigir si el usuario está autenticado y tiene el rol esperado', () => {
    authService.isAuthenticated.and.returnValue(true);
    authService.getUserRole.and.returnValue(UserRole.Admin);

    const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
      data: { expectedRole: UserRole.Admin },
      outlet: 'primary',
      component: null,
      routeConfig: null,
      root: null as any,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      paramMap: of({} as any) as any,
      queryParamMap: of({} as any) as any,
      title: undefined,
    };

    const mockRouterStateSnapshot: RouterStateSnapshot = {
      url: '/',
      root: mockActivatedRouteSnapshot,
    };

    const result = TestBed.runInInjectionContext(() =>
      roleGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
    );

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.getUserRole).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(result).toBeTrue();
  });
});
