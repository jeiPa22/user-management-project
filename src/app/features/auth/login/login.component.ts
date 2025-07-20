import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/application/auth/services/auth.service';
import { UserRole } from '../../../core/shared/constants/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  onLogin(): void {
    const { username, password } = this.loginForm.value;
    this.authService.authenticate({ username, password }).subscribe({
      next: (result) => {        
        if (result.success) {
          const role = result.role;
          if (role === UserRole.Admin) {
            this.router.navigate(['/dashboard/admin']);
          } else if (role === UserRole.Cashier) {
            this.router.navigate(['/dashboard/cashier']);
          }
        } else {
          this.loginError = true;
        }
      },
      error: (err) => {
        console.error('Error en autenticación:', err);
        this.loginError = true;
      },
    });
  }
}
