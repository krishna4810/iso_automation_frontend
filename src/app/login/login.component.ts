import {Component, ViewEncapsulation} from '@angular/core';
import {ApiService} from "../services/api.service";
import {loginData} from "../model/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {async} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  hide = false;
  username: string = '';
  password: string = '';
  loginForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  turnVisibility() {
    this.hide = !this.hide
  }

  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: [className],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  login() {
    const loginData: loginData = {
      UserName: this.loginForm.get('username')?.value,
      Password: this.loginForm.get('password')?.value
    };

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this.apiService.login(loginData).subscribe(async (res) => {
        if (!res.IsAuthenticated) {
          this.openSnackBar('Invalid Username or password', 'snackbar-error');
        } else {
          await this.authService.login(res.AuthToken, this.getUsername);
          await this.apiService.getLoggedInUserDataWithRoles(this.getUsername);
          await this.apiService.addUser(this.getUsername).subscribe(response => {
            this.router.navigate(['/home/dashboard']);
            this.openSnackBar(`Welcome ${this.getUsername} to ISO Compliance System`, 'snackbar-success');

          });
        }
      });
    }
  }

  get getUsername(): string {
    return this.loginForm.get('username')?.value;
  }
}
