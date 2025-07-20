import { Observable } from 'rxjs';
import { User } from '../../../domain/entities/user.entity';

/**
 * Funciones definidas para usuario.
 */
export interface IUserRepository {
  /**
   * Obtener todos los usuarios.
   * @return -> Observable que emite un array de usuarios.
   */
  getAll(): Observable<User[]>;

  /**
   * Crear un usuario.
   * @param user -> Modelo usuario como entrada,
   * @return -> Observable que emite el usuario creado.
   */
  create(user: User): Observable<User>;

  /**
   * Actualizar un usuario.
   * @param user -> Modelo usuario como entrada,
   * @return -> Observable que emite el usuario actualizado.
   */
  update(user: User): Observable<User>;

  /**
   * Eliminar un usuario.
   * @param id -> Identificador usuario.
   * @return -> Observable que emite void al completar la operación.
   */
  delete(id: string): Observable<boolean>;
}
