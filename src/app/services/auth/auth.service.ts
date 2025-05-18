import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginDto {
  email: string;
  passwordHash: string;
}

interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7193/api/Auth'; // your .NET backend URL

  http = inject(HttpClient);

  login(request: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, request);
  }

  register(request: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }
}
