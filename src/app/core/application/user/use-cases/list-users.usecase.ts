import { IUseCase } from '../interfaces/models/usecase.interface';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { User } from '../..//domain/entities/user.entity';
import { Observable } from 'rxjs';

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
