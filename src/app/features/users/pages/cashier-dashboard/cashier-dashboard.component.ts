import { Component } from '@angular/core';
import { ListUsersUseCase } from '../../../../core/application/user/use-cases/list-users.usecase';
import { User } from '../../../../core/domain/user/entities/user.entity';

@Component({
  selector: 'app-cashier-dashboard',
  templateUrl: './cashier-dashboard.component.html',
  styleUrl: './cashier-dashboard.component.scss',
})
export class CashierDashboardComponent {
  users: User[] = [];
  selectedUser?: User;

  constructor(private getUsers: ListUsersUseCase) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {}

  loadUsers(): void {
    this.getUsers.execute().subscribe((users) => {
      this.users = users;
    });
  }
}
