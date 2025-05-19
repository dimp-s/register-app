import { Routes } from '@angular/router';
import { CourseManagerComponent } from './pages/course/course.component';
import { adminGuard } from './guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'admin/courses',
    component: CourseManagerComponent,
    canActivate: [adminGuard],
  },
  // {
  //   path: 'dashboard',
  //   loadComponent: () =>
  //     import('./pages/dashboard/dashboard.component').then(
  //       (m) => m.DashboardComponent
  //     ),
  // },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
