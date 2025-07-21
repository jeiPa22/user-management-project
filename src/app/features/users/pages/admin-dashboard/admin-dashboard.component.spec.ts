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
import { UserMapper } from '../../../../core/shared/mappers/user.mapper';

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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;

    component.userModalRef = new ElementRef(document.createElement('div'));
    component.openModalBtn = new ElementRef(document.createElement('button'));

    listUsersUseCaseSpy.execute.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar usuarios en loadUsers', () => {
    const users = [
      new User(new UserId('1'), 'Juan', 'Pérez', 100, true, UserRole.Cashier),
    ];
    listUsersUseCaseSpy.execute.and.returnValue(of(users));

    component.loadUsers();

    expect(listUsersUseCaseSpy.execute).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });

  it('debería eliminar usuario correctamente', () => {
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
    spyOn(component, 'onOpenModal').and.callThrough();

    component.openCreateUser();

    expect(component.selectedUser).toBeUndefined();
    expect(component.onOpenModal).toHaveBeenCalled();
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
    spyOn(component, 'onOpenModal').and.callThrough();

    component.editUser(user);

    expect(component.selectedUser).toEqual(user);
    expect(component.onOpenModal).toHaveBeenCalled();
  });

  it('onOpenModal debería mostrar el modal', () => {
    // Crear un mock para bsModal.show()
    component['bsModal'] = { show: jasmine.createSpy('show') } as any;

    component.onOpenModal();

    expect(component['bsModal'].show).toHaveBeenCalled();
  });

  it('onCloseModal debería ocultar el modal y enfocar el botón', () => {
    component['bsModal'] = { hide: jasmine.createSpy('hide') } as any;
    const focusSpy = spyOn(component.openModalBtn.nativeElement, 'focus');

    component.onCloseModal();

    expect(component['bsModal'].hide).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('saveUser debería crear un usuario cuando no existe', () => {
    const newUser = new User(
      new UserId('1'),
      'Juan',
      'Pérez',
      100,
      true,
      UserRole.Admin
    );

    const mockUser = newUser; // o algún user válido

    createUserUseCaseSpy.execute.and.returnValue(of(mockUser));
    spyOn(component, 'onCloseModal').and.callThrough();
    spyOn(component, 'loadUsers').and.callThrough();

    component.users = [];

    component.saveUser(newUser);

    expect(component.onCloseModal).toHaveBeenCalled();
    expect(createUserUseCaseSpy.execute).toHaveBeenCalledWith(
      UserMapper.toDto(newUser)
    );
    expect(component.loadUsers).toHaveBeenCalled();
    expect(component.selectedUser).toBeUndefined();
  });

  it('saveUser debería actualizar un usuario cuando ya existe', () => {
    const existingUser = new User(
      new UserId('1'),
      'Juan',
      'Pérez',
      100,
      true,
      UserRole.Admin
    );

    const mockUser = existingUser;

    updateUserUseCaseSpy.execute.and.returnValue(of(mockUser));
    spyOn(component, 'onCloseModal').and.callThrough();
    spyOn(component, 'loadUsers').and.callThrough();

    component.users = [existingUser];

    component.saveUser(existingUser);

    expect(component.onCloseModal).toHaveBeenCalled();
    expect(updateUserUseCaseSpy.execute).toHaveBeenCalledWith(
      UserMapper.toDto(existingUser)
    );
    expect(component.loadUsers).toHaveBeenCalled();
    expect(component.selectedUser).toBeUndefined();
  });
});
