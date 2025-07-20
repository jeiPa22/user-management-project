import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CountUserComponent } from './components/count-user/count-user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { TableUserComponent } from './components/table-user/table-user.component';
import { CashierDashboardComponent } from './pages/cashier-dashboard/cashier-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../shared/ui/layouts/layouts.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [
    CountUserComponent,
    FormUserComponent,
    TableUserComponent,
    CashierDashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    LayoutsModule,
  ],
})
export class UsersModule {}
