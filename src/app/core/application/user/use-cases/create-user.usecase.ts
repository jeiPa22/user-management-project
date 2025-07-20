import { Observable } from 'rxjs';
import { User } from '../../../domain/user/entities/user.entity';
import { UserId } from '../../../domain/user/value-objects/user-id.vo';
import { IUserDto } from '../../../shared/dtos/user.dto';
import { IUseCase } from '../../../shared/interfaces/usecase.interface';
import { IUserRepository } from '../../../shared/interfaces/user-repository.interface';

/**
 *  Caso de uso para crear un usuario.
 */
export class CreateUserUseCase implements IUseCase<IUserDto, User> {
  /**
   * Crea una instancia de CreateUserUseCase.
   * @param userRepository -> Metodos crud para usuario.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Ejecuta la creacion de un usuario.
   * @param input -> Modelo de usuario.
   * @returns -> entidad usuario creada.
   */
  execute(input: IUserDto): Observable<User> {
    const user = new User(
      new UserId(input.id),
      input.name,
      input.lastname,
      input.points,
      input.active,
      input.role
    );
    return this.userRepository.create(user);
  }
}
