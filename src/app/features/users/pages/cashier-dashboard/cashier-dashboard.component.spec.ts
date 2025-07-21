import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashierDashboardComponent } from './cashier-dashboard.component';

import { of } from 'rxjs';
import { ListUsersUseCase } from '../../../../core/application/user/use-cases/list-users.usecase';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { UserId } from '../../../../core/domain/user/value-objects/user-id.vo';
import { UserRole } from '../../../../core/shared/constants/role.enum';

describe('CashierDashboardComponent', () => {
  let component: CashierDashboardComponent;
  let fixture: ComponentFixture<CashierDashboardComponent>;
  let listUsersUseCaseSpy: jasmine.SpyObj<ListUsersUseCase>;

  beforeEach(async () => {
    listUsersUseCaseSpy = jasmine.createSpyObj('ListUsersUseCase', ['execute']);

    await TestBed.configureTestingModule({
      declarations: [CashierDashboardComponent],
      providers: [{ provide: ListUsersUseCase, useValue: listUsersUseCaseSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CashierDashboardComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar usuarios al inicializar', () => {
    const users: User[] = [
      new User(new UserId('1'), 'Ana', 'Gómez', 10, true, UserRole.Cashier),
    ];
    listUsersUseCaseSpy.execute.and.returnValue(of(users));

    component.ngOnInit();

    expect(component.users).toEqual(users);
    expect(listUsersUseCaseSpy.execute).toHaveBeenCalled();
  });

  it('debería completar el Subject destroy$ al destruir el componente', () => {
    const completeSpy = spyOn<any>(component['destroy$'], 'complete');
    const nextSpy = spyOn<any>(component['destroy$'], 'next');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
