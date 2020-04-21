import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { isNull, isNil } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private userEmail = null;

  constructor(private authService: AuthService) { }

  public sendVerification(email) {
    return this.authService.sendVerification(email);
  }

  public verifyForgotPassToken(token): Observable<any> {
    console.log("token => ", token);
    return this.authService.isResetPassTokenExpired(token);

  }

  public setUserEmail(email) {
    this.userEmail = email;
  }

  public getUserEmail() {
    return this.userEmail;
  }

  public resetPassword(email, pass) {
    console.log("email: ", email, " ,pass: ", pass);
    return this.authService.setResetPassword(email, pass);
  }

}
