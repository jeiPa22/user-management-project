import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { CreateUserUseCase } from '../../../../core/application/user/use-cases/create-user.usecase';
import { UpdateUserUseCase } from '../../../../core/application/user/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../../../core/application/user/use-cases/delete-user.usecase';
import { ListUsersUseCase } from '../../../../core/application/user/use-cases/list-users.usecase';
import { UserId } from '../../../../core/domain/user/value-objects/user-id.vo';
import { UserRole } from '../../../../core/shared/constants/role.enum';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  let listUsersUseCaseSpy: jasmine.SpyObj<ListUsersUseCase>;
  let createUserUseCaseSpy: jasmine.SpyObj<CreateUserUseCase>;
  let updateUserUseCaseSpy: jasmine.SpyObj<UpdateUserUseCase>;
  let deleteUserUseCaseSpy: jasmine.SpyObj<DeleteUserUseCase>;

  beforeEach(async () => {
    listUsersUseCaseSpy = jasmine.createSpyObj('ListUsersUseCase', ['execute']);
    createUserUseCaseSpy = jasmine.createSpyObj('CreateUserUseCase', [
      'execute',
    ]);
    updateUserUseCaseSpy = jasmine.createSpyObj('UpdateUserUseCase', [
      'execute',
    ]);
    deleteUserUseCaseSpy = jasmine.createSpyObj('DeleteUserUseCase', [
      'execute',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      providers: [
        { provide: ListUsersUseCase, useValue: listUsersUseCaseSpy },
        { provide: CreateUserUseCase, useValue: createUserUseCaseSpy },
        { provide: UpdateUserUseCase, useValue: updateUserUseCaseSpy },
        { provide: DeleteUserUseCase, useValue: deleteUserUseCaseSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // evita errores por elementos desconocidos como app-dashboard-layout
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;

    // Simula elementos de ViewChild
    component.userModalRef = new ElementRef(document.createElement('div'));
    component.openModalBtn = new ElementRef(document.createElement('button'));

    listUsersUseCaseSpy.execute.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar usuarios en ngOnInit', () => {
    const users = [
      new User(new UserId('1'), 'Juan', 'Pérez', 100, true, UserRole.Cashier),
    ];
    listUsersUseCaseSpy.execute.and.returnValue(of(users));

    component.loadUsers();

    expect(listUsersUseCaseSpy.execute).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });

  it('debería eliminar usuario', () => {
    const user = new User(
      new UserId('1'),
      'Juan',
      'Pérez',
      100,
      true,
      UserRole.Admin
    );
    deleteUserUseCaseSpy.execute.and.returnValue(of(true));

    component.deleteUserById(user);

    expect(deleteUserUseCaseSpy.execute).toHaveBeenCalledWith('1');
  });

  it('debería abrir el modal para crear usuario', () => {
    spyOn(component as any, 'onOpenModal');
    component.openCreateUser();
    expect(component.selectedUser).toBeUndefined();
    expect((component as any).onOpenModal).toHaveBeenCalled();
  });

  it('debería abrir el modal para editar usuario', () => {
    const user = new User(
      new UserId('1'),
      'Juan',
      'Pérez',
      100,
      true,
      UserRole.Cashier
    );
    spyOn(component as any, 'onOpenModal');
    component.editUser(user);
    expect(component.selectedUser).toEqual(user);
    expect((component as any).onOpenModal).toHaveBeenCalled();
  });
});
