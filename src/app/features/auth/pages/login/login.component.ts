import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '../../../../core/shared/constants/role.enum';
import { AuthService } from '../../../../core/infrastructure/auth/services/auth.service';
import { IAuthResultDto } from '../../../../core/shared/dtos/auth.dto';

/**
 * Componente de inicio de sesión que maneja la autenticación de usuarios.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  /**
   * Formulario reactivo para manejar los datos de inicio de sesión.
   */
  loginForm: FormGroup;

  /**
   * Indica si hubo un error al intentar iniciar sesión.
   */
  loginError = false;

  /**
   * Constructor del componente de inicio de sesión.
   * @param fb  FormBuilder para crear formularios reactivos.
   * @param authService -> Servicio de autenticación para manejar la lógica de inicio de sesión.
   * @param router ->
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Inicializa el componente de inicio de sesión.
   */
  ngOnInit(): void {
    this.authService.logout();
  }

  /**
   * Maneja el evento de inicio de sesión.
   */
  onLogin(): void {
    const { username, password } = this.loginForm.value;
    this.authService.authenticate({ username, password }).subscribe({
      next: (result: IAuthResultDto) => {
        if (result.success) {
          const role = result.role;
          if (role === UserRole.Admin) {
            this.router.navigate(['/dashboard/admin']);
          } else if (role === UserRole.Cashier) {
            this.router.navigate(['/dashboard/cajero']);
          }
        } else {
          this.loginError = true;
        }
      },
      error: (err) => {
        console.error('Error en autenticación:', err);
        this.loginError = true;
      },
    });
  }
}
