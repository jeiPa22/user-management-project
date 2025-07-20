import { Observable } from 'rxjs';
import { User } from '../../../domain/user/entities/user.entity';
import { IUserDto } from '../../../shared/dtos/user.dto';
import { IUseCase } from '../../../shared/interfaces/usecase.interface';
import { UserMapper } from '../../../shared/mappers/user.mapper';
import { inject, Injectable } from '@angular/core';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';

/**
 * Caso de uso para actualizar un usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class UpdateUserUseCase implements IUseCase<IUserDto, User> {
  private readonly userRepository = inject(IUserRepository);

  /**
   *  Ejecuta la actualización de un usuario.
   * @param input
   * @returns -> Entidad usuario actualizada.
   */
  execute(input: IUserDto): Observable<User> {
    const user = UserMapper.toDomain(input);
    return this.userRepository.update(user);
  }
}
