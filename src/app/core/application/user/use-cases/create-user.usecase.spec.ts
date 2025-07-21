import { TestBed } from '@angular/core/testing';
import { CreateUserUseCase } from './create-user.usecase';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { of } from 'rxjs';
import { IUserDto } from '../../../shared/dtos/user.dto';
import { User } from '../../../domain/user/entities/user.entity';
import { UserId } from '../../../domain/user/value-objects/user-id.vo';
import { UserRole } from '../../../shared/constants/role.enum';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepositorySpy: jasmine.SpyObj<IUserRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('IUserRepository', ['create']);

    TestBed.configureTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: IUserRepository, useValue: spy },
      ],
    });

    useCase = TestBed.inject(CreateUserUseCase);
    userRepositorySpy = TestBed.inject(
      IUserRepository
    ) as jasmine.SpyObj<IUserRepository>;
  });

  it('debería crear un usuario y llamar al repositorio con un User correcto', (done) => {
    const input: IUserDto = {
      id: '123',
      name: 'John',
      lastname: 'Doe',
      points: 100,
      active: true,
      role: UserRole.Admin,
    };

    const expectedUser = new User(
      new UserId(input.id),
      input.name,
      input.lastname,
      input.points,
      input.active,
      input.role
    );

    userRepositorySpy.create.and.returnValue(of(expectedUser));

    useCase.execute(input).subscribe((result) => {
      expect(userRepositorySpy.create).toHaveBeenCalledWith(jasmine.any(User));
      expect(result).toEqual(expectedUser);
      done();
    });
  });
});
