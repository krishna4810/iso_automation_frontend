import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {StateService} from "./state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string='';

  constructor(private router: Router, private stateService: StateService) { }

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
    return !!this.accessToken || !!sessionStorage.getItem('accessToken');
  }
}
