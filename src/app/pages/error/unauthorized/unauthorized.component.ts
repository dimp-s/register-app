import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [MatCardModule, MatIconModule, RouterModule, MatButtonModule],
  template: `
    <div class="container d-flex flex-column justify-content-center align-items-center min-vh-60 text-center">
  <mat-card class="p-4" style="max-width: 500px;">
    <mat-card-header>
      <mat-icon color="warn" style="font-size: 48px;">lock</mat-icon>
    </mat-card-header>
    <mat-card-title>
      <h2 class="text-danger">Access Denied</h2>
    </mat-card-title>
    <mat-card-content>
      <p class="text-muted">
        You do not have the necessary permissions to view this page.
      </p>
    </mat-card-content>
    <mat-card-actions class="justify-content-center mt-3">
      <button mat-raised-button color="primary" routerLink="/">Go to Home</button>
    </mat-card-actions>
  </mat-card>
</div>
  `,
  styles: ``
})
export default class UnauthorizedComponent {

}
