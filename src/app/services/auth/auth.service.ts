import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

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
  private jwtToken = signal<string | null>(localStorage.getItem('token'));

  readonly isLoggedIn = computed(() => !!this.jwtToken());
  readonly role = computed(() => this.getRoleFromToken(this.jwtToken()));

  http = inject(HttpClient);
  router = inject(Router);
  // login(request: LoginDto): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, request);
  // }
  login(request: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, request).pipe(
      tap((res: any) => {
        const token = res.token;
        localStorage.setItem('token', token);
        this.jwtToken.set(token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.jwtToken.set(null);
  }

  register(request: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  getRoleFromToken(token: string | null): string | null {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roleKey =
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      return payload[roleKey] ?? null;
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

  getToken(): string | null {
    return this.jwtToken();
  }

  readonly token = this.jwtToken.asReadonly();
}
