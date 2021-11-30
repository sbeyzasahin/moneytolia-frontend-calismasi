import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    username: this.userNameFormControl,
    password: this.passwordFormControl,
  });
  constructor(private router: Router, private authService: AuthService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.authService.setAuthenticated(false)
  }

  formSubmit() {
    const userInfoChecked = this.checkUserInfo();

    if (userInfoChecked) {
      this.authService.setUser(this.loginForm.value)

      this.router.navigate(['kampanya-listesi']);
    } else {
      this.loginForm.setErrors({ 'error': true })
    }
  }

  checkUserInfo() {
    const { username, password } = this.loginForm.value;
    const user = this.localStorageService.getLocalStorageItem('user') || {};

    if (username === user.username && password === user.password) {
      return true;
    }

    return false;
  }

}
