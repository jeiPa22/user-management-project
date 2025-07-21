import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/infrastructure/auth/services/auth.service';
import { UserRole } from '../../../../../core/shared/constants/role.enum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roleTranslate' })
class MockRoleTranslatePipe implements PipeTransform {
  transform(value: any): string {
    return value;
  }
}

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'getUserRole',
      'logout',
    ]);

    // Simula que el usuario es Admin
    authServiceSpy.getUserRole.and.returnValue(UserRole.Admin);

    await TestBed.configureTestingModule({
      declarations: [
        DashboardLayoutComponent,
        MockRoleTranslatePipe, // ✅ Se declara el pipe mock
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar el rol del usuario en ngOnInit', () => {
    component.ngOnInit();
    expect(authServiceSpy.getUserRole).toHaveBeenCalled();
    expect(component.userRole).toBe(UserRole.Admin);
  });

  it('debería llamar logout y redirigir al login', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
