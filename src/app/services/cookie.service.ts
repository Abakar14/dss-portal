import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {

  // Set a cookie
  setCookie(name: string, value: string, days: number, path: string = '/'): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${path}`;
  }

  // Get a cookie
  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  // Delete a cookie
  deleteCookie(name: string, path: string = '/'): void {
    this.setCookie(name, '', -1, path); // Set the cookie with an expired date
  }

  // Delete all cookies
  deleteAll(path: string = '/'): void {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      this.deleteCookie(name.trim(), path);
    }
  }

  getCookies(){
    const cookies = document.cookie.split(';');
    return cookies;
  }
}
