import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private sessionStorage: Storage;

  constructor() {
    this.sessionStorage = window.sessionStorage;
  }

  get(key: string): any {
    if(this.isSessionStorageSupported()) {
      const item = this.sessionStorage.getItem(key)
      if(item)
        return JSON.parse(item);
    }
    return null;
  }

  set(key: string, value: any): boolean {
    let res = false;
    if(this.isSessionStorageSupported()) {
      this.sessionStorage.setItem(key, JSON.stringify(value));
      res = true;
    }
    return res;
  }

  remove(key: string): boolean {
    let res = false;
    if(this.isSessionStorageSupported()) {
      this.sessionStorage.removeItem(key);
      res = true;
    }
    return res;
  }

  clearStorage() {
    this.sessionStorage.clear();
  }

  isSessionStorageSupported(): boolean {
    return !!this.sessionStorage;
  }
}
