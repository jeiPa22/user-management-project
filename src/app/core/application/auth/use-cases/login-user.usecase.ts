import { IUseCase } from '../../interfaces/models/usecase.interface';
import { LoginInputDto, LoginOutputDto } from '../../dtos/login.dto';
import { Observable, of, throwError } from 'rxjs';

export class LoginUserUseCase
  implements IUseCase<LoginInputDto, LoginOutputDto>
{
  execute(input: LoginInputDto): Observable<LoginOutputDto> {
    const { username, password } = input;

    if (username === 'Admin' && password === 'LealAdmin') {
      return of({
        isAuthenticated: true,
        role: 'admin',
        redirectTo: '/dashboard/admin',
      });
    }

    if (username === 'Cajero' && password === 'LealCajero') {
      return of({
        isAuthenticated: true,
        role: 'cajero',
        redirectTo: '/dashboard/cajero',
      });
    }

    return throwError(() => new Error('Credenciales inválidas'));
  }
}
