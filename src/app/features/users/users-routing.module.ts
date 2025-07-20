import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from '../../core/infrastructure/auth/role.guard';
import { UserRole } from '../../core/shared/constants/role.enum';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CashierDashboardComponent } from './pages/cashier-dashboard/cashier-dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [roleGuard],
    data: { expectedRole: UserRole.Admin },
  },
  {
    path: 'cajero',
    component: CashierDashboardComponent,
    canActivate: [roleGuard],
    data: { expectedRole: UserRole.Cashier },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
