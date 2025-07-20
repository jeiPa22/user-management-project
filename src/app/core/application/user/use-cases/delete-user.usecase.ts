import { Observable } from 'rxjs';
import { IUseCase } from '../interfaces/models/usecase.interface';
import { IUserRepository } from '../interfaces/repositories/user-repository.interface';
import { UserMapper } from '../mappers/user.mapper';

/**
 * Caso de uso para eliminar un usuario.
 */
export class DeleteUserUseCase implements IUseCase<string, boolean> {
  /**
   * Crea una instancia de DeleteUserUseCase.
   * @param userRepository -> Metodos crud para usuario.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Ejecuta eliminación de usuario.
   * @param userId -> Identificador de usuario.
   * @returns
   */
  execute(userId: string): Observable<boolean> {
    return this.userRepository.delete(userId);
  }
}
