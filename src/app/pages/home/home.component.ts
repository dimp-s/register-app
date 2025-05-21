import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="hero-section">
      <div class="hero-content">
        <h1>Welcome to CourseToGo</h1>
        <p>Your one-stop platform to manage and explore courses efficiently.</p>
        <button mat-raised-button color="primary" routerLink="/register">
          Get Started
        </button>
      </div>
      <img src="https://static.vecteezy.com/system/resources/previews/016/466/991/non_2x/online-education-concept-illustration-study-learning-online-with-laptop-tablet-smartphone-and-headphones-from-home-cozy-online-learing-and-education-with-coffee-and-learning-books-free-png.png" alt="Hero image" />
    </div>

    <section class="stats-section">
      <mat-card class="stat-card">
        <!-- <h2>{{ totalCourses() }}</h2> -->
        <h2>Over 100 courses Available</h2>
        <p>Total Courses</p>
      </mat-card>
      <mat-card class="stat-card">
        <!-- <h2>{{ totalUsers() }}</h2> -->
        <h2>1k</h2>
        <p>Registered Users</p>
      </mat-card>
    </section>

    <footer class="footer">
      <p>2025 CourseToGo. All rights reserved.</p>
    </footer>
  `,
  styles: `.hero-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 2rem;
    background-color: #f5f5f5;
  
    img {
      max-width: 45%;
      border-radius: 1rem;
    }
  
    .hero-content {
      max-width: 50%;
  
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
  
      p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }
    }
  }
  
  .stats-section {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 3rem 0;
  
    .stat-card {
      text-align: center;
      padding: 2rem;
      width: 200px;
  
      h2 {
        font-size: 2rem;
        color: #3f51b5;
        margin-bottom: 0.5rem;
      }
  
      p {
        color: #555;
      }
    }
  }
  
  .footer {
    text-align: center;
    padding: 1.5rem;
    background-color: #f0f0f0;
    color: #666;
  }`,
})
export default class HomeComponent {
  private http = inject(HttpClient);

  totalCourses = signal<number>(0);
  totalUsers = signal<number>(0);

  constructor() {
    //api calls
    // Replace with your actual endpoints
    // this.http.get<any>('https://localhost:7193/api/course').subscribe((res) => {
    //   this.totalCourses.set(res.data?.length || 0);
    // });
    // this.http.get<any>('https://localhost:7193/api/user').subscribe((res) => {
    //   this.totalUsers.set(res.data?.length || 0);
    // });
  }
}
