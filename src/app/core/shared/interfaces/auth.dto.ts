/**
 * Modelo de credenciales.
 */
export interface IAuthCredentialsDto {
  /**
   * Nombre de usuario.
   */
  username: string;

  /**
   * Constraseña.
   */
  password: string;
}

/**
 * Modelo de resultado autenticación.
 */
export interface IAuthResultDto {
  /**
   * Respuesta.
   */
  success: boolean;

  /**
   * Token - llave acceso.
   */
  token?: string;

  /**
   * Rol.
   */
  role?: 'admin' | 'cashier';
}
