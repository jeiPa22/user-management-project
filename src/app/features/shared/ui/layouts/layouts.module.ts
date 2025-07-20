import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthLayoutComponent, DashboardLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [AuthLayoutComponent, DashboardLayoutComponent],
})
export class LayoutsModule {}
