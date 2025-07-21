import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CreateUserUseCase } from '../../../../core/application/user/use-cases/create-user.usecase';
import { DeleteUserUseCase } from '../../../../core/application/user/use-cases/delete-user.usecase';
import { UpdateUserUseCase } from '../../../../core/application/user/use-cases/update-user.usecase';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { UserId } from '../../../../core/domain/user/value-objects/user-id.vo';
import { UserRole } from '../../../../core/shared/constants/role.enum';
import { UserMapper } from '../../../../core/shared/mappers/user.mapper';
import { ListUsersUseCase } from '../../../../core/application/user/use-cases/list-users.usecase';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  let getUsersUseCaseSpy: jasmine.SpyObj<ListUsersUseCase>;
  let createUserUseCaseSpy: jasmine.SpyObj<CreateUserUseCase>;
  let updateUserUseCaseSpy: jasmine.SpyObj<UpdateUserUseCase>;
  let deleteUserUseCaseSpy: jasmine.SpyObj<DeleteUserUseCase>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    getUsersUseCaseSpy = jasmine.createSpyObj('ListUsersUseCase', ['execute']);
    createUserUseCaseSpy = jasmine.createSpyObj('CreateUserUseCase', [
      'execute',
    ]);
    updateUserUseCaseSpy = jasmine.createSpyObj('UpdateUserUseCase', [
      'execute',
    ]);
    deleteUserUseCaseSpy = jasmine.createSpyObj('DeleteUserUseCase', [
      'execute',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      providers: [
        { provide: ListUsersUseCase, useValue: getUsersUseCaseSpy },
        { provide: CreateUserUseCase, useValue: createUserUseCaseSpy },
        { provide: UpdateUserUseCase, useValue: updateUserUseCaseSpy },
        { provide: DeleteUserUseCase, useValue: deleteUserUseCaseSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar usuarios correctamente', () => {
    const users: User[] = [
      new User(new UserId('1'), 'Carlos', 'Ramírez', 20, true, UserRole.Admin),
    ];
    getUsersUseCaseSpy.execute.and.returnValue(of(users));

    component.loadUsers();

    expect(component.users).toEqual(users);
    expect(getUsersUseCaseSpy.execute).toHaveBeenCalled();
  });

  it('debería actualizar un usuario existente', () => {
    const existingUser = new User(
      new UserId('3'),
      'Laura',
      'Rojas',
      25,
      false,
      UserRole.Admin
    );
    const dto = UserMapper.toDto(existingUser);

    component.selectedUser = existingUser;
    component.saveUser(existingUser);

    expect(updateUserUseCaseSpy.execute).toHaveBeenCalledWith(dto);
  });

  it('debería crear un nuevo usuario', () => {
    const newUser = new User(
      new UserId('2'),
      'Pedro',
      'Luna',
      15,
      true,
      UserRole.Admin
    );
    const dto = UserMapper.toDto(newUser);

    component.selectedUser = undefined;
    component.saveUser(newUser);

    expect(createUserUseCaseSpy.execute).toHaveBeenCalledWith(dto);
  });

  it('debería eliminar un usuario', () => {
    const usuario = new User(
      new UserId('4'),
      'Diego',
      'Martínez',
      5,
      true,
      UserRole.Admin
    );

    component.deleteUserById(usuario);

    expect(deleteUserUseCaseSpy.execute).toHaveBeenCalledWith(
      usuario.id.getValue()
    );
  });
});
