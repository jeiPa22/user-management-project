import { Observable } from 'rxjs';
import { IAuthCredentialsDto, IAuthResultDto } from '../../dtos/auth.dto';

/**
 * Interfaz para metodos autenticacion.
 */
export interface IAuthService {
  /**
   * Autenticar.
   * @param credentials Modelo con usuario y contraseña.
   */
  authenticate(credentials: IAuthCredentialsDto): Observable<IAuthResultDto>;
}
