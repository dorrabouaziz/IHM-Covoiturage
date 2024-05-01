import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // replace with the actual path to your db.json file

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

 // In UserService
getUser(id: string): Observable<any> {
  console.log('Request URL:', `${this.apiUrl}/${id}`);
  return this.http.get(`${this.apiUrl}/${id}`);
}

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Update a user
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // Delete a user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}