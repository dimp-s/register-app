import { Component, inject } from '@angular/core';
import { EnrollmentDto } from '../../services/enrollment/enrollment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-course-detail-dialog',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          {{ data.courseName }}
          <span class="badge bg-success ms-2" *ngIf="data.isEnrolled"
            >Enrolled</span
          >
        </mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <p><strong>Credit Hours:</strong> {{ data.creditHours }}</p>
        <p><strong>Description:</strong></p>
        <p>
          {{ data.description }}
        </p>
      </mat-card-content>

      <mat-card-actions class="d-flex justify-content-between mt-3">
        <button
          mat-flat-button
          color="accent"
          [disabled]="data.isEnrolled"
          (click)="enroll()"
        >
          {{ data.isEnrolled ? 'Already Enrolled' : 'Enroll' }}
        </button>
        <button mat-stroked-button color="primary" (click)="close()">
          Back
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class CourseDetailDialogComponent {
  data = inject<EnrollmentDto>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<CourseDetailDialogComponent>);

  enrolled = this.data.isEnrolled; // initial state

  enroll() {
    // Optimistically disable the button
    this.enrolled = true;

    // Return info to parent to process actual API call
    this.dialogRef.close({ enroll: true, courseId: this.data.courseId });
  }

  close() {
    this.dialogRef.close();
  }
}
