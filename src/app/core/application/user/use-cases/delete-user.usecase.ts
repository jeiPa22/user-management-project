import { Observable } from 'rxjs';
import { IUseCase } from '../../../shared/interfaces/usecase.interface';
import { IUserRepositorySSSSSS } from '../../../shared/interfaces/user-repository.interface';
import { inject, Injectable } from '@angular/core';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';

/**
 * Caso de uso para eliminar un usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class DeleteUserUseCase implements IUseCase<string, boolean> {
  private readonly userRepository = inject(IUserRepository);

  /**
   * Ejecuta eliminación de usuario.
   * @param userId -> Identificador de usuario.
   * @returns
   */
  execute(userId: string): Observable<boolean> {
    return this.userRepository.delete(userId);
  }
}
