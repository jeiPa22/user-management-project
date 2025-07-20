import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

/**
 * Repositorio abstracto para gestionar datos de usuario.
 */
export abstract class UserRepository {
  /**
   * Obtener todos los usuarios.
   */
  abstract getAll(): Observable<User[]>;

  /**
   * Crea un nuevo usuario.
   * @param user -> Usuario a crear.
   */
  abstract create(user: User): Observable<boolean>;

  /**
   * Actualiza un usuario existente.
   * @param user -> Usuario a actualizar.
   */
  abstract update(user: User): Observable<boolean>;

  /**
   * Elimina un usuario por su ID.
   * @param id
   */
  abstract delete(id: string): Observable<boolean>;
}
