import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  private localStorage = window.localStorage;


  public setToLocalStore(key, value) {
    localStorage.setItem(key, value);
  }

  public getFromLocalStore(key) {
    return localStorage.getItem(key);
  }

  public removeFromLocalStore(key) {
    localStorage.removeItem(key);
  }

  public getNav() {
    const navJson = localStorage.getItem('nav');
    const navObj = JSON.parse(navJson);
    return navObj;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserDetails() {
    const userJson = localStorage.getItem('ud');
    const userObj = JSON.parse(userJson);
    return userObj;
  }

  public getLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  }

  public clearAll() {
    localStorage.clear();
  }

  public actionOnLogout() {
    this.clearAll();
  }
}
