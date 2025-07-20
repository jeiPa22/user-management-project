/**
 * Modelo de entrada para el inicio de sesión.
 */
export interface LoginInputDto {
  username: string;
  password: string;
}

/**
 * Modelo de salida de autenticación.
 */
export interface LoginOutputDto {
  isAuthenticated: boolean;
  role: 'admin' | 'cajero';
  redirectTo: string;
}
