import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { isNull, isNil } from 'lodash';
import {AuthService} from '@core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  constructor(private authService: AuthService) { }

  public verifyUserMail(token): Observable<any> {
    console.log("token => ", token);
    return this.authService.isUserEmailVerified(token);

  }
  
}
