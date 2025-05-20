import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="px-4">
      <span class="me-4 fw-bold">CourseToGo</span>

      <a mat-button routerLink="/home">Home</a>
      <a mat-button routerLink="/about">About</a>

      <span class="spacer"></span>

      @if(authService.isLoggedIn()){
      <button mat-button (click)="authService.logout()">Logout</button>
      @if(authService.role() === 'Admin'){
      <span class="me-4 fw-bold">Hi Admin</span>
      } } @else {
      <a mat-button routerLink="/login">Login</a>
      <a mat-button routerLink="/register">Register</a>
      }
    </mat-toolbar>
  `,
  styles: [
    `
      .mat-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .spacer {
        flex: 1 1 auto;
      }

      a {
        text-decoration: none;
        color: white;
        margin-left: 10px;
      }
    `,
  ],
})
export class NavbarComponent {
  authService = inject(AuthService);
}
