import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'register-app';
}
