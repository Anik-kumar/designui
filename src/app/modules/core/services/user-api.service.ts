import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../api-endpoints';
import { HttpClient } from '@angular/common/http';
import {ISignup} from '@modules/signup/isignup';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(ApiEndpoints.GET_USERS_API);
  }


  getUser(username: string, password: string): Observable<any> {
    // return this.http.post<any>(ApiEndpoints.FIND_USER_API, { 'email': username, 'password': password }, { withCredentials: true });
    return this.http.post<any>(ApiEndpoints.LOGIN, { 'email': username, 'pass': password }, { withCredentials: true });
  }

  createUser(newUser: ISignup): Observable<any> {
    return this.http.post<any>(ApiEndpoints.SIGNUP, newUser, { withCredentials: true });
  }
}

