import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { isNull, isNil } from 'lodash';
import {AuthService} from '@core/services/auth.service';
import {UserApiService} from '@core/services/user-api.service';
import {ISignup} from '@modules/registration/signup/isignup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private authService: AuthService, private userApiService: UserApiService) { }
  

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


  public checkDuplicateEmail(email) {
    
    return this.authService.isUserExists(email);

  }

}
