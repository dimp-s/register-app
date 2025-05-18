import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const roleKey =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload[roleKey] === 'Admin';
  } catch {
    return false;
  }
};
