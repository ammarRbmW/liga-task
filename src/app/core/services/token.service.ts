import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TokenService {

  getToken(): string {
    return window.localStorage.token;
  }

  saveToken(token: string) {
    window.localStorage.token = token;
  }

  destroyToken() {
    window.localStorage.removeItem('token');
  }

  generateRandomToken() {
    const length = 40;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
}
