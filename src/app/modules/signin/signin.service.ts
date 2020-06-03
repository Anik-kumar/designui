import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { isNull, isNil } from 'lodash';
import {AuthService} from '@core/services/auth.service';
import {UserApiService} from '@core/services/user-api.service';
import {AuthorizationService} from '@core/services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private authService: AuthService, private userApiService: UserApiService,  private authorizationService: AuthorizationService) {
  }

  private activeUser: {_id: string, firstName: string, lastName: string, email: string, dob: string, type: string } = {
    _id: null,
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    type: ''
  };

  public signin(email: string, pass: string): Observable<any> {
    const resultObsv = new Observable(subscriber => {
      let found = {};
      this.userApiService.getUser(email, pass).subscribe(user => {
        console.log('Response: ', user);
        if (!isNil(user)) {
          this.authService.setLoggedInUser(user);
          this.authService.setLoggedInStatus(true);
          found = user;
          this.activeUser = {
            _id: user._id,
            dob: user.dob,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type
          };
        }
        console.log(">> Token: " + this.authService.getAuthorizationToken());
        subscriber.next(found);
      });
    });

    return resultObsv;
  }

  public getAuthorizedRoutes(): Observable<any>{
    return this.authorizationService.getAuthorizedRoutes();
  }

  public setNavigations(navs){
    this.authorizationService.setNavigations(navs);
  }

}
