import { Component, Input } from '@angular/core';

/**
 * Componente que muestra el conteo de usuarios.
 */
@Component({
  selector: 'app-count-user',
  templateUrl: './count-user.component.html',
  styleUrl: './count-user.component.scss',
})
export class CountUserComponent {
  /**
   * Conteo de usuarios que se mostrará en el componente.
   */
  @Input() count: number | null = 0;
}
