import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string='';

  constructor(private router: Router) { }

  login(token: string, username: string | null ) {
    this.accessToken = token;
    sessionStorage.setItem('accessToken', token);
    if (typeof username === "string") {
      sessionStorage.setItem('username', username);
    }
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('username');
    this.accessToken = '';
    this.router.navigate([''])
  }

  isLoggedIn(): boolean {
    // Check if the token exists
    return !!this.accessToken || !!sessionStorage.getItem('accessToken');
  }
}
