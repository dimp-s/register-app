import { Component, inject, signal } from '@angular/core';
import {
  EnrollmentDto,
  EnrollmentService,
} from '../../services/enrollment/enrollment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseDetailDialogComponent } from '../../components/courseDetail/course-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollment',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.css',
})
export default class EnrollmentComponent {
  courseImgUrl =
    'https://static.vecteezy.com/system/resources/previews/024/043/963/original/book-icon-clipart-transparent-background-free-png.png';
  courses = signal<EnrollmentDto[]>([]);
  loading = signal<boolean>(true);

  enrollmentService = inject(EnrollmentService);
  snackbar = inject(MatSnackBar);
  dialog = inject(MatDialog);

  constructor() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.loading.set(true);
    this.enrollmentService.getAvailableCourses().subscribe({
      next: (res) => {
        console.log(res.data);
        this.courses.set(res.data ?? []);
        console.log(this.courses());
        this.loading.set(false);
      },
      error: () => {
        this.snackbar.open('Failed to load courses', 'Close', {
          duration: 3000,
        });
        this.loading.set(false);
      },
    });
  }

  enroll(courseId: number) {
    this.enrollmentService.enrollInCourse(courseId).subscribe({
      next: (res) => {
        this.snackbar.open(res.message, 'Close', { duration: 3000 });
        this.fetchCourses(); // refresh to reflect enrollment
      },
      error: (err) => {
        const message = err.error?.message ?? 'Enrollment failed';
        this.snackbar.open(message, 'Close', { duration: 3000 });
      },
    });
  }

  openCourseDialog(course: EnrollmentDto) {
    const dialogRef = this.dialog.open(CourseDetailDialogComponent, {
      width: '600px',
      data: course,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.enroll && result.courseId) this.enroll(result.courseId);
    });
  }
}
