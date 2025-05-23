import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import CourseManagerComponent from './pages/course/course.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'admin/courses',
    loadComponent: () => import('./pages/course/course.component'),
    canActivate: [adminGuard],
  },
  {
    path: 'browseCourse',
    loadComponent: () => import('./pages/enrollment/enrollment.component'),
  },

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/error/unauthorized/unauthorized.component'),
  },
  // {
  //   path: 'dashboard',
  //   loadComponent: () =>
  //     import('./pages/dashboard/dashboard.component').then(
  //       (m) => m.DashboardComponent
  //     ),
  // },
];
