import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {UserInterface} from '@interface/user.interface';
import { LocalStorageService } from './local-storage.service';
import { isNil, isNull} from 'lodash';
import { ApiEndpoints } from '../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private activeUser: {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    token: string,
  };

  constructor( private http: HttpClient, private localStore: LocalStorageService) { }

  private authToken: string;

  private loggedInUser: {_id: string, name: string, email: string, dob: string } = {
    _id: null,
    name: '',
    email: '',
    dob: ''
  };

  private isLoggedIn = false;

  public getLoggedInStatus() {
    return this.isLoggedIn;
  }

  public setLoggedInStatus(status: boolean) {
    this.isLoggedIn = status;
  }

  public getAuthorizationToken(): string {
    return this.authToken;

  }

  public setAuthorizationToken(token: string) {
    this.authToken = token;
    this.localStore.setToLocalStore('token', token);
  }

  public getLoggedInUser(): {_id: string, name: string, email: string, dob: string } {
    return this.loggedInUser;
  }

  public setLoggedInUser(user: UserInterface) {
    this.loggedInUser._id = user._id;
    this.loggedInUser.name = user.firstName + ' ' + user.lastName;
    this.loggedInUser.email = user.email;
    this.loggedInUser.dob = user.dob;
  }

  public isAuthenticated(): any {
    // let cookieStr = document.cookie;
    // var cookFlag = true;
    // if(!cookieStr){
    //   cookFlag = false;
    // }
    // const dirtyCookies = cookieStr.split(';');
    // const cleanCookies = [];
    //
    // dirtyCookies.forEach(temp => {
    //   cleanCookies.push(temp.split('='));
    // });
    //
    // if(cleanCookies[0][0] === 'Username' && cookFlag){
    //   const cookieUsername = cleanCookies[0][1];
    // }
    // if(cleanCookies[1][0] === 'Password' && cookFlag){
    //   const cookiePassword = cleanCookies[1][1];
    // }
    // if(cleanCookies[2][0] === 'Token' && cookFlag){
    //   const cookieToken = cleanCookies[2][1];
    // }

    return this.isLoggedIn;
  }


  public isUserEmailVerified(data): Observable<any> {

    return this.http.post<any>(ApiEndpoints.USER_EMAIL_VERIFY, {'token': data}, { withCredentials: true });
  }

  public isUserExists(data): Observable<any> {
    return this.http.post<any>(ApiEndpoints.FIND_EMAIL_API, {'email': data}, { withCredentials: true });
  }

}
