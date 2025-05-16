// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
//   templateUrl: './dashboard.component.html',
// })
// export class DashboardComponent implements OnInit {
//   userData: any = null;

//   authService = inject(AuthService);

//   ngOnInit() {
//     const userId = this.authService.getUserIdFromToken();
//     console.log(userId);
//     if (userId) {
//       this.authService.getDashboardData(userId).subscribe({
//         next: (data) => (this.userData = data),
//         error: (err) => console.error('Failed to load dashboard data', err),
//       });
//     }
//   }
// }
