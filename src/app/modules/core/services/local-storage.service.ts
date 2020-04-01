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

  public clearAll() {
    localStorage.clear();
  }
}
