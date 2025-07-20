import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../core/domain/user/entities/user.entity';

/**
 * Componente de tabla de usuarios que muestra una lista de usuarios y permite editar o eliminar.
 */
@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.scss',
})
export class TableUserComponent {
  /**
   * Lista de usuarios que se mostrarán en la tabla.
   */
  @Input() users: User[] = [];

  /**
   * Evento que se emite al editar un usuario.
   */
  @Output() edit = new EventEmitter<User>();

  /**
   * Evento que se emite al eliminar un usuario.
   */
  @Output() remove = new EventEmitter<User>();
}
