import { Observable } from 'rxjs';
import { User } from '../../../domain/user/entities/user.entity';
import { UserId } from '../../../domain/user/value-objects/user-id.vo';
import { IUserDto } from '../../../shared/dtos/user.dto';
import { IUseCase } from '../../../shared/interfaces/usecase.interface';
import { Injectable, inject } from '@angular/core';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';

/**
 *  Caso de uso para crear un usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class CreateUserUseCase implements IUseCase<IUserDto, User> {
  private readonly userRepository = inject(IUserRepository);

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
