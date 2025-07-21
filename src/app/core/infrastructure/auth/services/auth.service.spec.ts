import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserRole } from '../../../shared/constants/role.enum';
import { IAuthCredentialsDto } from '../../../shared/dtos/auth.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear(); // Limpia estado antes de cada prueba
  });

  afterEach(() => {
    localStorage.clear(); // Limpia estado después de cada prueba
  });

  it('debería autenticar correctamente al administrador', (done) => {
    const credentials: IAuthCredentialsDto = {
      username: 'Admin',
      password: 'LealAdmin',
    };

    service.authenticate(credentials).subscribe((result) => {
      expect(result.success).toBeTrue();
      expect(result.role).toBe(UserRole.Admin);
      expect(localStorage.getItem('auth')).toBeTruthy();
      done();
    });
  });

  it('debería autenticar correctamente al cajero', (done) => {
    const credentials: IAuthCredentialsDto = {
      username: 'Cajero',
      password: 'LealCajero',
    };

    service.authenticate(credentials).subscribe((result) => {
      expect(result.success).toBeTrue();
      expect(result.role).toBe(UserRole.Cashier);
      expect(localStorage.getItem('auth')).toBeTruthy();
      done();
    });
  });

  it('debería fallar si las credenciales son inválidas', (done) => {
    const credentials: IAuthCredentialsDto = {
      username: 'userX',
      password: 'wrongPassword',
    };

    service.authenticate(credentials).subscribe({
      next: () => fail('No debería autenticarse con credenciales inválidas'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('Invalid credentials');
        expect(localStorage.getItem('auth')).toBeNull();
        done();
      },
    });
  });

  it('debería retornar true si el usuario está autenticado', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ success: true, role: UserRole.Admin })
    );
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('debería retornar false si no hay autenticación', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('debería retornar el rol del usuario autenticado', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ success: true, role: UserRole.Cashier })
    );
    expect(service.getUserRole()).toBe(UserRole.Cashier);
  });

  it('debería retornar null si no hay autenticación', () => {
    expect(service.getUserRole()).toBeFalsy();
  });

  it('debería eliminar la autenticación al cerrar sesión', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ success: true, role: UserRole.Admin })
    );
    service.logout();
    expect(localStorage.getItem('auth')).toBeNull();
  });
});
