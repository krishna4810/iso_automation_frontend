import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthService) {
  }
  hoveredMessage: string | null = null;

  showMessage(message: string): void {
    this.hoveredMessage = message;
  }

  clearMessage(): void {
    this.hoveredMessage = null;
  }
}
