import { Component, computed, inject, signal } from '@angular/core';
import {
  StudentDashboardDto,
  StudentDashboardService,
} from '../../services/student-dashboard/student-dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EnrollmentService } from '../../services/enrollment/enrollment.service';
const defaultDashboard: StudentDashboardDto = {
  firstName: '',
  lastName: '',
  profileImage: '',
  enrolledCourses: [],
};
const imageUrl = `https://localhost:7193$`;
@Component({
  selector: 'app-student-dashboard',
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export default class StudentDashboardComponent {
  courseImgUrl =
    'https://static.vecteezy.com/system/resources/previews/024/043/963/original/book-icon-clipart-transparent-background-free-png.png';
  private dashboardService = inject(StudentDashboardService);
  private enrollmentService = inject(EnrollmentService);
  private snackbar = inject(MatSnackBar);
  loading = signal(false);

  private _dashboard = signal<StudentDashboardDto>(defaultDashboard);

  dashboard = computed(() => this._dashboard());
  fullName = computed(
    () => `${this._dashboard().firstName} ${this._dashboard().lastName}`
  );

  constructor() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading.set(true);
    this.dashboardService.getDashboard().subscribe({
      next: (res) => {
        let dashboard = res.data ?? defaultDashboard;

        // Ensure full image URL
        if (
          dashboard.profileImage &&
          !dashboard.profileImage.startsWith('http')
        ) {
          dashboard.profileImage = `https://localhost:7193${dashboard.profileImage}`;
        }

        setTimeout(() => {
          this._dashboard.set(dashboard);
          this.loading.set(false);
        }, 1000);
      },
      error: () => {
        this.snackbar.open('Failed to load dashboard', 'Close', {
          duration: 3000,
        });
        this.loading.set(false);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.dashboardService.uploadProfilePhoto(file).subscribe((res) => {
        console.log(res);
        if (res.data) {
          this._dashboard.update((d) => ({ ...d, profileImage: res.data! }));
        }
        console.log(this._dashboard());
        this.snackbar.open(res.message, 'Close', {
          duration: 3000,
        });
      });
    }
  }

  expandedCourseId: number | null = null;

  toggleCourse(courseId: number) {
    this.expandedCourseId =
      this.expandedCourseId === courseId ? null : courseId;
  }

  dropCourse(courseId: number, event: MouseEvent) {
    event.stopPropagation(); // prevent toggle from triggering
    if (confirm('Are you sure you want to drop this course?')) {
      this.enrollmentService.dropCourse(courseId).subscribe({
        next: (res) => {
          this.snackbar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.loadDashboard();
        },
        error: (res) => {
          this.snackbar.open(res.message, 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
}
