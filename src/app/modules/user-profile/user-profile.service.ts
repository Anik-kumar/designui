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

  private userProfileDetails;
  private userDesignDetails;

  constructor(private router: Router, private authService: AuthService, private authorizationService: AuthorizationService) { }

  public getNavs() {
    return this.authorizationService.getNavs();
  }

  public _getUserProfileData() {
    return this.authorizationService.getUserProfileDetails();
  }

  public _getUserProfileDesigns() {
    return this.authorizationService.getUserDesigns();
  }

  public setUserProfileDetails(obj) {
    this.userProfileDetails = obj;
  }

  public getUserProfileDetails() {
    return this.userProfileDetails;
  }

  public setUserDesignDetails(obj) {
    this.userDesignDetails = obj;
  }

  public getUserDesignDetails() {
    return this.userDesignDetails;
  }

}
