import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';

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
  constructor(private router: Router, private authService: AuthService) { }

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
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (username === user.username && password === user.password) {
      return true;
    }

    return false;
  }

}
