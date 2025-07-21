import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/infrastructure/auth/services/auth.service';
import { UserRole } from '../../../../../core/shared/constants/role.enum';

/**
 * Componente de diseño del dashboard que proporciona una estructura básica para las páginas del dashboard.
 */
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit {
  /**
   * Rol del usuario actual, utilizado para mostrar información en la interfaz.
   */
  userRole?: UserRole;

  /**
   * Constructor del componente de diseño del dashboard.
   * @param router -> Router para manejar la navegación.
   * @param authService -> Servicio de autenticación para manejar el estado del usuario.
   */
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Inicializa el componente y obtiene el rol del usuario desde el servicio de autenticación.
   */
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  /**
   * Maneja el evento de cierre de sesión.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
