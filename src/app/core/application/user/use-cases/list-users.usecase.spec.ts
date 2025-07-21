import { TestBed } from '@angular/core/testing';
import { ListUsersUseCase } from './list-users.usecase';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { of } from 'rxjs';
import { User } from '../../../domain/user/entities/user.entity';
import { UserId } from '../../../domain/user/value-objects/user-id.vo';
import { UserRole } from '../../../shared/constants/role.enum';

describe('ListUsersUseCase', () => {
  let useCase: ListUsersUseCase;
  let userRepositorySpy: jasmine.SpyObj<IUserRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('IUserRepository', ['getAll']);

    TestBed.configureTestingModule({
      providers: [
        ListUsersUseCase,
        { provide: IUserRepository, useValue: spy },
      ],
    });

    useCase = TestBed.inject(ListUsersUseCase);
    userRepositorySpy = TestBed.inject(
      IUserRepository
    ) as jasmine.SpyObj<IUserRepository>;
  });

  it('debería llamar a getAll y retornar lista de usuarios', (done) => {
    const mockUsers: User[] = [
      new User(new UserId('1'), 'John', 'Doe', 50, true, UserRole.Admin),
      new User(new UserId('2'), 'Jane', 'Smith', 30, false, UserRole.Cashier),
    ];

    userRepositorySpy.getAll.and.returnValue(of(mockUsers));

    useCase.execute().subscribe((users) => {
      expect(userRepositorySpy.getAll).toHaveBeenCalled();
      expect(users).toEqual(mockUsers);
      done();
    });
  });
});
