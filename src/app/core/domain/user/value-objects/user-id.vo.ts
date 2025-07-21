import { generateUuid } from '../../../shared/utils/uuid.util';

/**
 * Objeto valor identificador de usuario.
 */
export class UserId {
  /**
   * Valor del identificador de usuario.
   */
  private readonly value: string;

  /**
   * Crea una instancia de UserId.
   * @param id -> Identificador único del usuario.
   */
  constructor(id?: string) {
    this.value = id ?? generateUuid();
  }

  /**
   * Obtiene el valor del identificador de usuario.
   * @returns -> Devuelve el valor del identificador de usuario.
   */
  getValue(): string {
    return this.value;
  }
}
