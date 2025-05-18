import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';

export interface ResponseDto {
  message: string;
  error?: string;
  data?: CourseDto[];
}

export interface CourseDto {
  id?: number;
  name: string;
  creditHours: number;
}

@Injectable({ providedIn: 'root' })
export class CourseManagerService {
  private http = inject(HttpClient);
  readonly courses = signal<CourseDto[]>([]);

  private readonly apiUrl = 'https://localhost:7193/api/Course';

  fetchAll() {
    console.log(this.courses());
    return this.http
      .get<ResponseDto>(this.apiUrl)
      .pipe(tap((res) => this.courses.set(res?.data ?? [])));
  }

  create(course: CourseDto) {
    return this.http
      .post(this.apiUrl, course)
      .pipe(tap(() => this.fetchAll().subscribe()));
  }

  update(id: number, course: CourseDto) {
    return this.http
      .put(`${this.apiUrl}/${id}`, course)
      .pipe(tap(() => this.fetchAll().subscribe()));
  }

  delete(id: number) {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.fetchAll().subscribe()));
  }
}
