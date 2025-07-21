import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserRepository } from './domain/user/repositories/user.repository';
import { LocalStorageUserRepository } from './infrastructure/repositories/local-storage-user.repository';
import { RoleTranslatePipe } from './shared/pipe/role-translate.pipe';

@NgModule({
  declarations: [RoleTranslatePipe],
  imports: [CommonModule],
  providers: [
    {
      provide: IUserRepository,
      useClass: LocalStorageUserRepository,
    },
  ],
  exports: [RoleTranslatePipe],
})
export class CoreModule {}
