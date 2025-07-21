import { TestBed } from '@angular/core/testing';
import { UpdateUserUseCase } from './update-user.usecase';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { of } from 'rxjs';
import { IUserDto } from '../../../shared/dtos/user.dto';
import { User } from '../../../domain/user/entities/user.entity';
import { UserMapper } from '../../../shared/mappers/user.mapper';
import { UserRole } from '../../../shared/constants/role.enum';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let userRepositorySpy: jasmine.SpyObj<IUserRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('IUserRepository', ['update']);

    TestBed.configureTestingModule({
      providers: [
        UpdateUserUseCase,
        { provide: IUserRepository, useValue: spy },
      ],
    });

    useCase = TestBed.inject(UpdateUserUseCase);
    userRepositorySpy = TestBed.inject(
      IUserRepository
    ) as jasmine.SpyObj<IUserRepository>;

    // Opcional: espía el método toDomain para llamar el original
    spyOn(UserMapper, 'toDomain').and.callThrough();
  });

  it('debería actualizar un usuario y llamar al repositorio con el User correcto', (done) => {
    const input: IUserDto = {
      id: '123',
      name: 'John',
      lastname: 'Doe',
      points: 100,
      active: true,
      role: UserRole.Admin,
    };

    const expectedUser = UserMapper.toDomain(input);
    userRepositorySpy.update.and.returnValue(of(expectedUser));

    useCase.execute(input).subscribe((result) => {
      expect(UserMapper.toDomain).toHaveBeenCalledWith(input);
      expect(userRepositorySpy.update).toHaveBeenCalledWith(expectedUser);
      expect(result).toEqual(expectedUser);
      done();
    });
  });
});
