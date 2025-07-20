import { UserRole } from '../constants/role.enum';

/**
 * Modelo usuario.
 */
export interface IUserDto {
  /**
   * Identificador.
   */
  id: string;

  /**
   * Nombre.
   */
  name: string;

  /**
   * Apellido.
   */
  lastname: string;

  /**
   * Rol del usuario.
   */
  role: UserRole;

  /**
   * Puntos acumulados.
   */
  points: number;

  /**
   * Usuario activo.
   */
  active: boolean;
}
