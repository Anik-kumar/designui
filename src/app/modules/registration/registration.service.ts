import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { isNull, isNil } from 'lodash';
import {AuthService} from '@core/services/auth.service';
import {UserApiService} from '@core/services/user-api.service';
import {ISignup} from '@modules/registration/signup/isignup';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private authService: AuthService, private userApiService: UserApiService) { }

  private activeUser: {_id: string, firstName: string, lastName: string, email: string, dob: string } = {
    _id: null,
    firstName: '',
    lastName: '',
    email: '',
    dob: ''
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
            lastName: user.lastName
          };
        }
        console.log(">> Token: " + this.authService.getAuthorizationToken());
        subscriber.next(found);
      });
    });

    return resultObsv;
  }

  public signup(userData: ISignup): Observable<any> {
    const resultObsv = new Observable(subscriber => {
      let found = {};
      this.userApiService.createUser(userData).subscribe(user => {
        console.log('Response: ', user);
        // if (!isNil(user)) {
        //   this.authService.setLoggedInUser(user);
        //   this.authService.setLoggedInStatus(true);
        //   found = user;
        //   this.activeUser = {
        //     _id: user._id,
        //     dob: user.dob,
        //     email: user.email,
        //     firstName: user.firstName,
        //     lastName: user.lastName
        //   };
        // }

        console.log(">> Token: " + this.authService.getAuthorizationToken());
        
        subscriber.next(user);
      });
    });

    return resultObsv;
  }

  public verifyUserMail(token): Observable<any> {

    return this.authService.isUserEmailVerified(token);

  }


  public checkDuplicateEmail(email) {
    
    return this.authService.isUserExists(email);

  }

}
