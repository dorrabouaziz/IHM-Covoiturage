import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  private baseUrl = 'http://localhost:3000';

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    console.log(sessionStorage.getItem('user'));
    this.loggedIn.next(true);
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.loggedIn.next(false);
  }

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
}
