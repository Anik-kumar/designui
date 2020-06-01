import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull, isNil } from 'lodash';
import { AuthService } from '@core/services/auth.service';
import { UserApiService } from '@core/services/user-api.service';
import { AuthorizationService } from '@core/services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private designs;

  constructor(
    private router: Router, 
    private authorizationService: AuthorizationService) 
  { }

  getNavs() {
    return this.authorizationService.getNavs();
  }

  getDesigns() {
    return this.designs;
  }

  setDesigns(obj) {
    this.designs = obj;
  }

  makeDesignStateReviewing(designId) {
    return this.authorizationService.setUserDesignStateReviewing(designId);
  }

}
