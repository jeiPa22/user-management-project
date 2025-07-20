import { Observable } from 'rxjs';
import { User } from '../../../domain/user/entities/user.entity';
import { IUseCase } from '../../../shared/interfaces/usecase.interface';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { inject, Injectable } from '@angular/core';

/**
 * Caso de uso para listar todos los usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class ListUsersUseCase implements IUseCase<void, User[]> {
  private readonly userRepository = inject(IUserRepository);

  /**
   * Ejecutar listar usuarios.
   * @returns -> Lista de entidades usuario.
   */
  execute(): Observable<User[]> {
    return this.userRepository.getAll();
  }
}
