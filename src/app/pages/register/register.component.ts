import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;
  authService = inject(AuthService);
  snackbar = inject(MatSnackBar);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.form.invalid) {
      this.snackbar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
      return;
    }
    const request = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      passwordHash: this.form.value.password,
    };
    this.authService.register(request).subscribe({
      next: (response) => {
        console.log('Registered!', response);
        this.snackbar.open('User Registered!', 'Close', { duration: 3000 });
      },
      error: (err) => {
        let message = 'Registration Failed! Please try again.';
        if (typeof err.error === 'string') {
          message = err.error;
        }
        console.error('Registration failed', err);
        this.snackbar.open(message, 'Close', { duration: 3000 });
      },
    });
  }
}
