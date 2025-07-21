import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { UserRole } from '../../../../core/shared/constants/role.enum';
import { AuthService } from '../../../../core/infrastructure/auth/services/auth.service';

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
   * Rol del usuario actual, utilizado para mostrar u ocultar acciones específicas.
   */
  public currentUserRole?: UserRole;

  /**
   * Enum de roles de usuario para uso en la plantilla.
   */
  public UserRole = UserRole;

  /**
   * Constructor del componente de diseño del dashboard.
   * @param authService -> Servicio de autenticación para manejar el estado del usuario.
   */
  constructor(private authService: AuthService) {}

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

  /**
   * Inicializa el componente y obtiene el rol del usuario desde el servicio de autenticación.
   */
  ngOnInit(): void {
    this.currentUserRole = this.authService.getUserRole();
  }
}
