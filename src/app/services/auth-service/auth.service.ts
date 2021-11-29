import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: User;
  constructor() { }

  setUser(user: User) {
    this.user = user
    this.setAuthenticated(true);
  }
  logout() {
    this.setAuthenticated(false);
  }
  getUser() {
    return this.user;
  }

  public setAuthenticated(val: boolean) {
    localStorage.setItem('isAuthenticated', val.toString());
  }

  public isAuthenticated(): boolean {
    const res = localStorage.getItem('isAuthenticated') || 'false';
    return res === 'true';
  }

}
