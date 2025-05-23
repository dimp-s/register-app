import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../enrollment/enrollment.service';

export interface CourseInfo {
  courseId: number;
  name: string;
  creditHours: number;
  description: string;
  enrolledOn: string;
}

export interface StudentDashboardDto {
  firstName: string;
  lastName: string;
  profileImage: string;
  enrolledCourses: CourseInfo[];
}

@Injectable({ providedIn: 'root' })
export class StudentDashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7193/api/StudentDashboard';
  getDashboard(): Observable<ResponseDto<StudentDashboardDto>> {
    return this.http.get<ResponseDto<StudentDashboardDto>>(
      `${this.apiUrl}/dashboard`
    );
  }

  uploadProfilePhoto(file: File): Observable<ResponseDto<string>> {
    const formData = new FormData();
    formData.append('profileImage', file);

    return this.http.post<ResponseDto<string>>(
      `${this.apiUrl}/upload-photo`,
      formData
    );
  }
}
