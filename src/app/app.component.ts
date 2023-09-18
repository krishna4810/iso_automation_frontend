import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {SpinnerService} from "./services/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService, public spinnerService: SpinnerService) {
    // Check if the user is already logged in
    const token = sessionStorage.getItem('accessToken');
    const username = sessionStorage.getItem('username');
    if (token) {
      this.authService.login(token, username);
    }
  }
}
