import { Observable } from 'rxjs';
import { User } from '../../../domain/user/entities/user.entity';
import { IUserDto } from '../../../shared/dtos/user.dto';
import { IUseCase } from '../../../shared/interfaces/usecase.interface';
import { IUserRepository } from '../../../shared/interfaces/user-repository.interface';
import { UserMapper } from '../../../shared/mappers/user.mapper';

/**
 * Caso de uso para actualizar un usuario.
 */
export class UpdateUserUseCase implements IUseCase<IUserDto, User> {
  /**
   * Crea una instancia de UpdateUserUseCase.
   * @param userRepository -> Metodos crud para usuario.
   */
  constructor(private userRepository: IUserRepository) {}

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
