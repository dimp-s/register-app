import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ResponseDto<T> {
  message: string;
  error?: string;
  data?: T;
}

export interface EnrollmentDto {
  courseId: number;
  courseName: string;
  creditHours: number;
  description: string;
  isEnrolled: boolean;
}

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private apiUrl = 'https://localhost:7193/api/Enrollment';
  private http = inject(HttpClient);

  getAvailableCourses(): Observable<ResponseDto<EnrollmentDto[]>> {
    return this.http.get<ResponseDto<EnrollmentDto[]>>(
      `${this.apiUrl}/mycourses`
    );
  }

  enrollInCourse(courseId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/enroll/${courseId}`,
      {}
    );
  }

  dropCourse(courseId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/drop/${courseId}`,
      {}
    );
  }

  searchCourse(query: string): Observable<ResponseDto<EnrollmentDto[]>> {
    return this.http.get<ResponseDto<EnrollmentDto[]>>(
      `${this.apiUrl}/search`,
      { params: { query } }
    );
  }
}
