import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../constants/role.enum';

@Pipe({ name: 'roleTranslate' })
export class RoleTranslatePipe implements PipeTransform {
  transform(value: UserRole): string {
    switch (value) {
      case UserRole.Admin:
        return 'Administrador';
      case UserRole.Cashier:
        return 'Cajero';
      default:
        return value;
    }
  }
}
