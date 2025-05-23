import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  CourseDto,
  CourseManagerService,
} from '../../services/course/course.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export default class CourseComponent {
  private courseService = inject(CourseManagerService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  editingCourse = signal<any | null>(null);
  courses = this.courseService.courses;
  // courses = signal<CourseDto[]>([]);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    creditHours: ['', Validators.required],
    description: ['']
  });

  isEditing = computed(() => this.editingCourse() !== null);

  constructor() {
    const role = this.getUserRoleFromToken();
    if (role !== 'Admin') {
      this.router.navigate(['/unauthorized']);
    } else {
      this.courseService.fetchAll().subscribe();
    }

    effect(() => {
      const course = this.editingCourse();
      if (course) {
        this.form.setValue({
          name: course.name,
          creditHours: course.creditHours,
          description: course.description
        });
      } else {
        this.form.reset();
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
      return;
    }
    const value = this.form.value;
    if (this.isEditing()) {
      this.courseService.update(this.editingCourse().id, value).subscribe({
        next: () => {
          this.snackBar.open('Course updated!', '', { duration: 2000 });
          this.editingCourse.set(null);
          this.courseService.fetchAll().subscribe(); // Refresh list
        },
        error: (err) => {
          const errorResponse = err?.error;
          const errorMessage =
            errorResponse?.error ||
            errorResponse?.message ||
            'Something went wrong.';

          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        },
      });
    } else {
      this.courseService.create(value).subscribe({
        next: () => {
          this.snackBar.open('Course added!', '', { duration: 2000 });
          this.form.reset();
          this.courseService.fetchAll().subscribe(); // Refresh list
        },
        error: (err) => {
          const errorResponse = err?.error;
          const errorMessage =
            errorResponse?.error ||
            errorResponse?.message ||
            'Something went wrong.';
          console.log(errorMessage);
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        },
      });
    }
  }

  edit(course: any) {
    this.editingCourse.set(course);
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.courseService.delete(id).subscribe(() => {
        this.snackBar.open('Course deleted!', '', { duration: 2000 });
      });
    }
  }

  cancelEdit() {
    this.editingCourse.set(null);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private getUserRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    const rolekey =
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload[rolekey] || null;
    } catch {
      return null;
    }
  }
}
