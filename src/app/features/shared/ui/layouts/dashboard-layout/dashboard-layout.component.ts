import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente de diseño del dashboard que proporciona una estructura básica para las páginas del dashboard.
 */
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  /**
   * Constructor del componente de diseño del dashboard.
   * @param router -> Router para manejar la navegación.
   */
  constructor(private router: Router) {}

  /**
   * Maneja el evento de cierre de sesión.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
