import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: User;
  constructor(private localStorageService:LocalStorageService) { }



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
    this.localStorageService.setLocalStorageItem('isAuthenticated', val.toString());
  }

  public isAuthenticated(): boolean {
    const res = this.localStorageService.getLocalStorageItem('isAuthenticated') || 'false';
    return res === 'true';
  }

}
