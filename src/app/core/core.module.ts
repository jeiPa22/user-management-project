import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserRepository } from './domain/user/repositories/user.repository';
import { LocalStorageUserRepository } from './infrastructure/repositories/local-storage-user.repository';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: IUserRepository,
      useClass: LocalStorageUserRepository,
    },
  ],
})
export class CoreModule {}
