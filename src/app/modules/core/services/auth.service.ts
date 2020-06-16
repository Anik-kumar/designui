import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {UserInterface} from '@interface/user.interface';
import { LocalStorageService } from './local-storage.service';
import { isNil, isNull} from 'lodash';
import { ApiEndpoints } from '../api-endpoints';
import { USER_TYPE } from '../../../enum/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private activeUser: {
    _id: string,
    unique_id: string,
    firstName: string,
    lastName: string,
    email: string,
    type: string,
    token: string,
  };

  constructor( private http: HttpClient, private localStore: LocalStorageService) { }

  private authToken: string;
  private userType: number;
  private adminTypeUser: boolean;

  private loggedInUser: {_id: string, unique_id: string, name: string, email: string, type: string, dob: string } = {
    _id: null,
    unique_id: '',
    name: '',
    email: '',
    type: '',
    dob: ''
  };

  private isLoggedIn = false;

  private accessibleRoutes = [];

  public getLoggedInStatus() {
    return this.isLoggedIn;
  }

  public setLoggedInStatus(status: boolean) {
    this.isLoggedIn = status;
    this.localStore.removeFromLocalStore('isLoggedIn');
    this.localStore.setToLocalStore('isLoggedIn', status);
  }

  public getAuthorizationToken(): string {
    return this.authToken;

  }

  public setAuthorizationToken(token: string) {
    this.authToken = token;
    this.localStore.removeFromLocalStore('token');
    this.localStore.setToLocalStore('token', token);
  }

  public getLoggedInUser(): {_id: string, unique_id: string, name: string, email: string, dob: string } {
    return this.loggedInUser;
  }

  public setLoggedInUser(user: {email: string, token: string, unique_id: string, type: string, name: {first: string, last: string}, role: []}) {
    this.loggedInUser._id = user.unique_id;
    this.loggedInUser.name = user.name.first + ' ' + user.name.last;
    this.loggedInUser.email = user.email;
    this.loggedInUser.dob = null;
    this.loggedInUser.type = user.type;
    console.log('setLoggedInUser: ', user);
    this.localStore.setToLocalStore('ud', JSON.stringify(user));
    this.localStore.setToLocalStore('uid', user.unique_id);
    // this.localStore.setToLocalStore('uid',);
  }

  public isAuthenticated(): any {
    return this.isLoggedIn;
  }

  public setUserType(userType) {
    this.userType = userType;
  }

  public getUserType(): number {
    return this.userType;
  }

  public setAdminTypeUser(yes: boolean) {
    this.adminTypeUser = yes;
  }

  public isAdminTypeUser(): boolean {
    return this.adminTypeUser;
  }

  public isAdminUser(): boolean {
    return this.userType === USER_TYPE.ADMIN;
  }

  public isSuperAdminUser(): any {
    return this.userType === USER_TYPE.SUPER_ADMIN;
  }

  public isReviewer(): boolean {
    return this.userType === USER_TYPE.REVIEWER;
  }

  public isDesignerTypeUser(): any {
    return this.userType === USER_TYPE.DESIGNER;
  }

  public isCustomerTypeUser(): any {
    return this.userType === USER_TYPE.CUSTOMER;
  }

  public renewToken(data) {
    return this.http.post<any>(ApiEndpoints.RENEW_TOKEN, {}, { withCredentials: true });
  }


  /**
   * Verifing user signup verification
   * @param {string} data - signup token
   */
  public isUserEmailVerified(data): Observable<any> {

    return this.http.post<any>(ApiEndpoints.USER_EMAIL_VERIFY, {'token': data}, { withCredentials: true });
  }

  /**
   * Checking for duplicate users
   * @param {string} data - email of user
   */
  public isUserExists(data): Observable<any> {
    return this.http.post<any>(ApiEndpoints.FIND_EMAIL_API, {'email': data}, { withCredentials: true });
  }

  /**
   * Uploads user design name, type, tags and file
   * @param {object} data - form object
   */
  public designUpload(data): Observable<any> {
    return this.http.post<any>(ApiEndpoints.UPLOAD_DESIGN_IMAGE, {'data': data}, {withCredentials: true});
  }

  /**
   * User forgot password reset verification
   * @param {string} data - email of user
   */
  public sendVerification(data): Observable<any> {
    return this.http.post<any>(ApiEndpoints.SEND_RESET_PASS, {'email': data}, {withCredentials: true});
  }


  public isResetPassTokenExpired(data): Observable<any> {
    return this.http.post<any>(ApiEndpoints.VALIDATE_TOKEN_HS, {'token': data}, {withCredentials: true});
  }

  public setResetPassword(email, pass) {
    return this.http.post<any>(ApiEndpoints.RESET_PASS, {'email': email, 'password': pass}, {withCredentials: true});
  }

  public actionOnLogout() {
    this.isLoggedIn = false;
    this.authToken = null;
    this.loggedInUser = {
      _id: null,
      unique_id: '',
      name: '',
      email: '',
      type: '',
      dob: ''
    };
  }

}
