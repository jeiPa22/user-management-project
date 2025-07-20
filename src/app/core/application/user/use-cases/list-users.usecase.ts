import { Observable } from 'rxjs';
import { User } from '../../../domain/user/entities/user.entity';
import { IUseCase } from '../../../shared/interfaces/usecase.interface';
import { IUserRepository } from '../../../shared/interfaces/user-repository.interface';

/**
 * Caso de uso para listar todos los usuarios.
 */
export class ListUsersUseCase implements IUseCase<void, User[]> {
  /**
   * Crea una instancia de ListUsersUseCase.
   * @param userRepository -> Metodos crud para usuario.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Ejecutar listar usuarios.
   * @returns -> Lista de entidades usuario.
   */
  execute(): Observable<User[]> {
    return this.userRepository.getAll();
  }
}
