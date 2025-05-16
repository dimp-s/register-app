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

  getDashboardData(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, {
      params: { id: userId },
    });
  }

  // getUserIdFromToken(): string | null {
  //   const token = localStorage.getItem('token');
  //   if (!token) return null;

  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1])); // Decode base64 payload
  //     return payload?.nameidentifier || null; // Match ClaimTypes.NameIdentifier from backend
  //   } catch (e) {
  //     console.error('Invalid token', e);
  //     return null;
  //   }
  // }
}
