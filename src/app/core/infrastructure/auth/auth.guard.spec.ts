import { TestBed } from '@angular/core/testing';
import {
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { authGuard } from './auth.guard'; // Ajusta la ruta si es necesario
import { AuthService } from './services/auth.service'; // Ajusta la ruta si es necesario

class MockAuthService {
  isAuthenticated = jasmine.createSpy('isAuthenticated');
}

class MockRouter {
  createUrlTree = jasmine.createSpy('createUrlTree');
  navigate = jasmine.createSpy('navigate');
}

describe('authGuard', () => {
  let routerSpy: MockRouter;
  let authServiceSpy: MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    routerSpy = TestBed.inject(Router) as unknown as MockRouter;
    authServiceSpy = TestBed.inject(AuthService) as unknown as MockAuthService;
  });

  it('debería permitir el acceso si el usuario está autenticado', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const mockActivatedRouteSnapshot: ActivatedRouteSnapshot =
      {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot: RouterStateSnapshot =
      {} as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
    );

    expect(result).toBeTrue();
    expect(routerSpy.createUrlTree).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('debería redirigir a /login si el usuario no está autenticado', () => {
    // No necesitamos mockTree aquí si el guard retorna 'false'
    // const mockTree = {} as UrlTree;
    // routerSpy.createUrlTree.and.returnValue(mockTree); // Esta línea ya no es necesaria

    authServiceSpy.isAuthenticated.and.returnValue(false);

    const mockActivatedRouteSnapshot: ActivatedRouteSnapshot =
      {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot: RouterStateSnapshot =
      {} as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockActivatedRouteSnapshot, mockRouterStateSnapshot)
    );

    // El guard debería retornar 'false' y llamar a 'router.navigate'
    expect(result).toBeFalse(); // Cambiado de toBe(mockTree) a toBeFalse()
    expect(routerSpy.createUrlTree).not.toHaveBeenCalled(); // Asegurarse de que createUrlTree NO se llame
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']); // Asegurarse de que navigate SÍ se llame
  });
});
