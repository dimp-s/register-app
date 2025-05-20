import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  snackbar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) {
      this.snackbar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
      return;
    }
    const request = {
      email: this.form.value.email,
      passwordHash: this.form.value.password, // plain text password, backend hashes it
    };

    this.authService.login(request).subscribe({
      next: () => {
        const role = this.authService.role();
        if (role === 'Admin') {
          this.router.navigate(['/admin/courses']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        let message = 'Login Failed! Please try again.';
        if (typeof err.error === 'string') {
          message = err.error;
        }
        console.error('Login failed', err);
        this.snackbar.open(message, 'Close', { duration: 3000 });
      },
    });
  }

  // private getRoleFromToken(token: string): string | null {
  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));

  //     // This is the fully-qualified key where ASP.NET Core puts the role claim
  //     const roleKey =
  //       'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  //     const role = payload[roleKey];
  //     console.log('Decoded Role:', role);

  //     return role ?? null;
  //   } catch (e) {
  //     console.error('Failed to decode token', e);
  //     return null;
  //   }
  // }
}
