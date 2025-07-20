import { UserRole } from '../../../shared/constants/role.enum';
import { UserId } from '../value-objects/user-id.vo';

/**
 * Usuario entidad.
 */
export class User {
  /**
   * Crea un nuevo usuario.
   * @param id -> Identificador único del usuario.
   * @param name -> Nombres del usuario.
   * @param lastname -> Apellidos del usuario.
   * @param points -> Puntos acumulados por el usuario.
   * @param active -> Indica si el usuario está activo o no.
   * @param role -> Rol del usuario (admin, cashier).
   */
  constructor(
    public readonly id: UserId,
    public name: string,
    public lastname: string,
    public points: number,
    public active: boolean,
    public role: UserRole
  ) {}

  /**
   * Actualiza los puntos del usuario.
   */
  toggleActive(): void {
    this.active = !this.active;
  }

  /**
   * Actualiza los nombres y apellidos del usuario.
   * @param nombres -> Nombres del usuario.
   * @param apellidos -> Apellidos del usuario.
   */
  updateName(nombres: string, apellidos: string): void {
    this.name = nombres;
    this.lastname = apellidos;
  }

  /**
   * Convierte la entidad a un objeto primitivo.
   * @returns -> Objeto primitivo representando al usuario.
   */
  toPrimitives(): any {
    return {
      id: this.id.getValue(),
      nombres: this.name,
      apellidos: this.lastname,
      puntos: this.points,
      activo: this.active,
      role: this.role,
    };
  }

  /**
   * Crea una instancia de entidad usuario a partir de un objeto primitivo.
   * @param data -> Objeto primitivo representando al entidad usuario.
   * @returns -> Instancia de entidad usuario.
   */
  static fromPrimitives(data: any): User {
    return new User(
      new UserId(data.id),
      data.nombres,
      data.apellidos,
      data.puntos,
      data.activo,
      data.role
    );
  }
}
