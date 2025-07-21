import { Component, ElementRef, ViewChild } from '@angular/core';
import { CreateUserUseCase } from '../../../../core/application/user/use-cases/create-user.usecase';
import { DeleteUserUseCase } from '../../../../core/application/user/use-cases/delete-user.usecase';
import { UpdateUserUseCase } from '../../../../core/application/user/use-cases/update-user.usecase';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { ListUsersUseCase } from '../../../../core/application/user/use-cases/list-users.usecase';
import { Modal } from 'bootstrap';

import { UserMapper } from '../../../../core/shared/mappers/user.mapper';
import { Subject, takeUntil } from 'rxjs';

/**
 *  administrador dashboard component
 */
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  /**
   * Lista de usuários
   */
  users: User[] = [];

  /**
   * Usuario selecionado
   */
  selectedUser?: User;

  /**
   * modal reference.
   */
  private bsModal!: Modal;

  /**
   * Subject para destruir o componente
   */
  private destroy$ = new Subject<void>();

  /**
   * Referencia de componente modal
   */
  @ViewChild('userModalRef') userModalRef!: ElementRef;

  /**
   * Referencia de boton para abrir modal
   */
  @ViewChild('openModalBtn') openModalBtn!: ElementRef<HTMLButtonElement>;

  /**
   * Construtor do componente
   * @param getUsers - Use case para listar usuários
   * @param createUser - Use case para criar usuário
   * @param updateUser - Use case para atualizar usuário
   * @param deleteUser - Use case para deletar usuário
   */
  constructor(
    private getUsers: ListUsersUseCase,
    private createUser: CreateUserUseCase,
    private updateUser: UpdateUserUseCase,
    private deleteUser: DeleteUserUseCase
  ) {}

  /**
   * Método para inicializar o componente
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Método despues de ser inicializado o componente
   */
  ngAfterViewInit(): void {
    this.bsModal = new Modal(this.userModalRef.nativeElement, {
      backdrop: 'static',
    });
  }

  /**
   * Método destrutor del componente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Metodo para listar usuarios
   */
  loadUsers(): void {
    this.getUsers
      .execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users;
      });
  }

  /**
   * Método para salvar usuario
   * @param user ->Uusario guardardo.
   */
  saveUser(user: User): void {
    this.onCloseModal();
    const exists = this.users.some(
      (u) => u.id.getValue() === user.id.getValue()
    );

    const action = exists ? this.updateUser : this.createUser;
    const userDto = UserMapper.toDto(user);

    action.execute(userDto).subscribe(() => {
      this.selectedUser = undefined;
      this.loadUsers();
    });
  }

  /**
   * Metodo para crear un usuario.
   */
  openCreateUser(): void {
    this.selectedUser = undefined;
    this.onOpenModal();
  }

  /**
   * Metodo para editar un usuario
   * @param user -> Usuario a editar
   */
  editUser(user: User): void {
    this.selectedUser = user;
    this.onOpenModal();
  }

  /**
   * Metodo para abrir modal
   */
  onOpenModal(): void {
    this.bsModal.show();
  }

  /**
   * Metodo para cerrar modal
   */
  onCloseModal(): void {
    this.bsModal.hide();
    this.openModalBtn.nativeElement.focus();
  }

  /**
   * Metodo para eliminar un usuario
   * @param user -> Usuario a eliminar
   */
  deleteUserById(user: User): void {
    const id = user.id.getValue();
    this.deleteUser
      .execute(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadUsers());
  }
}
