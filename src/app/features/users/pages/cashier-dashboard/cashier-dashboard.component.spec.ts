import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashierDashboardComponent } from './cashier-dashboard.component';
import { ListUsersUseCase } from '../../../../core/application/user/use-cases/list-users.usecase';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { UserId } from '../../../../core/domain/user/value-objects/user-id.vo';
import { Component } from '@angular/core';
import { UserRole } from '../../../../core/shared/constants/role.enum';
import { of } from 'rxjs';
import { LayoutsModule } from '../../../shared/ui/layouts/layouts.module';

// Mock para ListUsersUseCase
class MockListUsersUseCase {
  execute() {
    const mockUsers: User[] = [
      new User(
        new UserId('1'),
        'Usuario Uno',
        'Apellido Uno',
        100,
        true,
        UserRole.Cashier
      ),
      new User(
        new UserId('2'),
        'Usuario Dos',
        'Apellido Dos',
        150,
        false,
        UserRole.Admin
      ),
    ];
    return of(mockUsers);
  }
}

// Mock para app-count-user
@Component({
  selector: 'app-count-user',
  template: '',
})
class MockCountUserComponent {}

// Mock para app-table-user
@Component({
  selector: 'app-table-user', // El selector debe coincidir exactamente
  template: '', // Un template vacío es suficiente
})
class MockTableUserComponent {}

describe('CashierDashboardComponent', () => {
  let componente: CashierDashboardComponent;
  let fixture: ComponentFixture<CashierDashboardComponent>;
  let mockListUsersUseCase: MockListUsersUseCase;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CashierDashboardComponent,
        MockCountUserComponent,
        MockTableUserComponent, // Añade el mock del componente 'app-table-user' aquí
      ],
      imports: [LayoutsModule],
      providers: [
        { provide: ListUsersUseCase, useClass: MockListUsersUseCase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CashierDashboardComponent);
    componente = fixture.componentInstance;
    mockListUsersUseCase = TestBed.inject(
      ListUsersUseCase
    ) as unknown as MockListUsersUseCase;
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería cargar usuarios al inicializar el componente', () => {
    const spy = spyOn(mockListUsersUseCase, 'execute').and.callThrough();
    componente.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(componente.users.length).toBeGreaterThan(0);
    expect(componente.users[0].name).toEqual('Usuario Uno');
    expect(componente.users[0].id.getValue()).toEqual('1');
  });

  it('debería limpiar suscripciones al destruir el componente', () => {
    const spyNext = spyOn((componente as any).destroy$, 'next');
    const spyComplete = spyOn((componente as any).destroy$, 'complete');
    componente.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('loadUsers debería actualizar la lista de usuarios', () => {
    const newMockUsers: User[] = [
      new User(
        new UserId('3'),
        'Usuario Tres',
        'Apellido Tres',
        200,
        true,
        UserRole.Cashier
      ),
    ];
    spyOn(mockListUsersUseCase, 'execute').and.returnValue(of(newMockUsers));
    componente.loadUsers();
    expect(componente.users).toEqual(newMockUsers);
  });
});
