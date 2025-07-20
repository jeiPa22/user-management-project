import { IUseCase } from '../interfaces/models/usecase.interface';
import { IUserDto } from '../dtos/user.dto';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Observable } from 'rxjs';
import { UserId } from '../../domain/value-objects/user-id.vo';

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
