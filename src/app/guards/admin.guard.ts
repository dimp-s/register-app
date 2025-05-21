import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = () => {
  // const token = localStorage.getItem('token');
  // const roleKey =
  //   'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  // if (!token) return false;

  // try {
  //   const payload = JSON.parse(atob(token.split('.')[1]));
  //   return payload[roleKey] === 'Admin';
  // } catch {
  //   return false;
  // }
  const router = inject(Router)
  const authService = inject(AuthService)
  const token = authService.getToken();
  const role = authService.getRoleFromToken(token)
  if(!token){
    router.navigate(['/login']);
    return false;
  } 
  try{
    const isAdmin = role === "Admin"; 
    if(!isAdmin){
      router.navigate(['/unauthorized']);
    }
    return isAdmin

  }catch {
    router.navigate(['/unauthorized']);
    return false;
  }
};
