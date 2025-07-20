import { IUseCase } from '../interfaces/models/usecase.interface';
import { IUserDto } from '../dtos/user.dto';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Observable } from 'rxjs';
import { UserMapper } from '../mappers/user.mapper';

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
