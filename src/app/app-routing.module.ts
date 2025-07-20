import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthLayoutComponent } from './features/shared/ui/layouts/auth-layout/auth-layout.component';
import { UnauthorizedPageComponent } from './features/shared/ui/pages/unauthorized-page/unauthorized-page.component';
import { authGuard } from './core/infrastructure/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
