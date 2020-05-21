import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull, isNil } from 'lodash';
import { AuthService } from '@core/services/auth.service';
import { UserApiService } from '@core/services/user-api.service';
import { AuthorizationService } from '@core/services/authorization.service';
// import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private router: Router, private authService: AuthService, private authorizationService: AuthorizationService) { }

  public getNavs() {
    return this.authorizationService.getNavs();
  }

}
