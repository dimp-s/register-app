import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = localStorage.getItem('token');

  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        router.navigate(['login']);
      }
      return throwError(() => error);
    })
  );
};
