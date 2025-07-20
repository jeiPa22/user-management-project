import { Observable } from 'rxjs';
import { IUseCase } from '../../../shared/interfaces/usecase.interface';
import { IUserRepository } from '../../../shared/interfaces/user-repository.interface';

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
