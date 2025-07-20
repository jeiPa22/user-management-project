import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../../core/infrastructure/auth/services/auth.service';
import { UserRole } from '../../../../core/shared/constants/role.enum';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', [
      'authenticate',
      'logout',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar al método logout al inicializar', () => {
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  it('debe redirigir al dashboard de admin si el login es exitoso y el rol es Admin', () => {
    authServiceSpy.authenticate.and.returnValue(
      of({ success: true, role: UserRole.Admin })
    );

    component.loginForm.setValue({ username: 'Admin', password: 'LealAdmin' });
    component.onLogin();

    expect(authServiceSpy.authenticate).toHaveBeenCalledWith({
      username: 'Admin',
      password: 'LealAdmin',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard/admin']);
  });

  it('debe redirigir al dashboard de cajero si el login es exitoso y el rol es Cashier', () => {
    authServiceSpy.authenticate.and.returnValue(
      of({ success: true, role: UserRole.Cashier })
    );

    component.loginForm.setValue({
      username: 'Cajero',
      password: 'LealCajero',
    });
    component.onLogin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard/cajero']);
  });

  it('debe establecer loginError en true si el login falla', () => {
    authServiceSpy.authenticate.and.returnValue(
      of({ success: false, role: null as any })
    );

    component.loginForm.setValue({ username: 'fail', password: 'wrong' });
    component.onLogin();

    expect(component.loginError).toBeTrue();
  });

  it('debe establecer loginError en true si ocurre un error durante la autenticación', () => {
    authServiceSpy.authenticate.and.returnValue(
      throwError(() => new Error('Credenciales inválidas'))
    );

    component.loginForm.setValue({ username: 'fail', password: 'fail' });
    component.onLogin();

    expect(component.loginError).toBeTrue();
  });
});
