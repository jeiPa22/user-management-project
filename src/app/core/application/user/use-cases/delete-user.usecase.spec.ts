import { TestBed } from '@angular/core/testing';
import { DeleteUserUseCase } from './delete-user.usecase';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { of } from 'rxjs';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let userRepositorySpy: jasmine.SpyObj<IUserRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('IUserRepository', ['delete']);

    TestBed.configureTestingModule({
      providers: [
        DeleteUserUseCase,
        { provide: IUserRepository, useValue: spy },
      ],
    });

    useCase = TestBed.inject(DeleteUserUseCase);
    userRepositorySpy = TestBed.inject(IUserRepository) as jasmine.SpyObj<IUserRepository>;
  });

  it('debería eliminar un usuario y retornar true', (done) => {
    const userId = 'abc123';
    userRepositorySpy.delete.and.returnValue(of(true));

    useCase.execute(userId).subscribe((result) => {
      expect(userRepositorySpy.delete).toHaveBeenCalledWith(userId);
      expect(result).toBeTrue();
      done();
    });
  });
});
