import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs';

import {User} from '../models';
import {map, distinctUntilChanged} from 'rxjs/operators';
import {TokenService} from '../services';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private tokenService: TokenService
  ) {
  }

  getUserByFiled(data, filed = 'username'): User {
    const users = JSON.parse(localStorage.getItem('users'));
    return users.find(userTemp => userTemp[filed] === data[filed]);
  }

  populate() {
    if (this.tokenService.getToken()) {
      const data = {token: this.tokenService.getToken()};
      const user = this.getUserByFiled(data, 'token');

      if (user) {
        this.setAuth(user);
      } else {
        this.purgeAuth();
      }

    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save Token sent from server in localstorage
    this.tokenService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove Token from localstorage
    this.tokenService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  login(data) {

    const user = this.getUserByFiled(data, 'username');

    if (user) {
      if (data.password === user.password) {
        this.setAuth(user);
        return {
          status: true,
          message: 'Signed in successfully'
        };
      } else {
        return {
          status: false,
          message: 'Username or password not correct'
        };
      }
    } else {
      return {
        status: false,
        message: 'The user not found, sign up please.'
      };
    }

  }

  signUp(data: User) {
    let users = [];
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
      const isExist = users.filter(user => user.username === data.username);
      if (isExist.length !== 0) {
        return false;
      } else {
        data.token = this.tokenService.generateRandomToken();
        users.push(data);
      }
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }

    data.token = this.tokenService.generateRandomToken();
    users = [data];
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

// Update the user on the server (email, pass, etc)
  update(user: User): User {

    const users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex(userTemp => userTemp.username === user.username);
    const oldData = users[index];
    user.token = oldData.token;
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
    this.currentUserSubject.next(user);

    return user;
  }
}
