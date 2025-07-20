import { Component, ElementRef, ViewChild } from '@angular/core';
import { CreateUserUseCase } from '../../../../core/application/user/use-cases/create-user.usecase';
import { DeleteUserUseCase } from '../../../../core/application/user/use-cases/delete-user.usecase';
import { UpdateUserUseCase } from '../../../../core/application/user/use-cases/update-user.usecase';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { ListUsersUseCase } from '../../../../core/application/user/use-cases/list-users.usecase';
import { Modal } from 'bootstrap';

import { UserMapper } from '../../../../core/shared/mappers/user.mapper';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  users: User[] = [];
  selectedUser?: User;
  private bsModal!: Modal;
  @ViewChild('userModalRef') userModalRef!: ElementRef;
  @ViewChild('openModalBtn') openModalBtn!: ElementRef<HTMLButtonElement>;

  constructor(
    private getUsers: ListUsersUseCase,
    private createUser: CreateUserUseCase,
    private updateUser: UpdateUserUseCase,
    private deleteUser: DeleteUserUseCase
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.bsModal = new Modal(this.userModalRef.nativeElement, {
      backdrop: 'static',
    });
  }

  ngOnDestroy(): void {}

  loadUsers(): void {
    this.getUsers.execute().subscribe((users) => {
      this.users = users;
    });
  }

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

  openCreateUser(): void {
    this.selectedUser = undefined;
    this.onOpenModal();
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.onOpenModal();
  }

  onOpenModal(): void {
    this.bsModal.show();
  }

  onCloseModal(): void {
    this.bsModal.hide();
    this.openModalBtn.nativeElement.focus();
  }

  deleteUserById(user: User): void {
    const id = user.id.getValue();
    this.deleteUser.execute(id).subscribe(() => this.loadUsers());
  }
}
