import { Component } from '@angular/core';
import { ListUsersUseCase } from '../../../../core/application/user/use-cases/list-users.usecase';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { Subject, takeUntil } from 'rxjs';

/**
 * Cajero dashboard component
 */
@Component({
  selector: 'app-cashier-dashboard',
  templateUrl: './cashier-dashboard.component.html',
  styleUrl: './cashier-dashboard.component.scss',
})
export class CashierDashboardComponent {
  /**
   * Lista de usuarios
   */
  users: User[] = [];

  /**
   * Usuario seleccionado
   */
  selectedUser?: User;

  /**
   * Subject para destruir o componente
   */
  private destroy$ = new Subject<void>();

  /**
   * Contructor del componente CashierDashboardComponent
   * @param getUsers -> Use case para listar usuarios
   */
  constructor(private getUsers: ListUsersUseCase) {}

  /**
   * Método que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Metodo para destruir el componente y liberar recursos
   */
  /**
   * Método destrutor del componente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga los usuarios utilizando el use case ListUsersUseCase
   */
  loadUsers(): void {
    this.getUsers
      .execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users;
      });
  }
}
