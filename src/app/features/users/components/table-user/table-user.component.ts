import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../core/domain/user/entities/user.entity';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.scss',
})
export class TableUserComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<User>();
  @Output() remove = new EventEmitter<User>();
}
