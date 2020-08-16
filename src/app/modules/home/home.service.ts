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
export class HomeService {

  designId: string;
  designObj: object;

  constructor(private router: Router, private authService: AuthService, private authorizationService: AuthorizationService) { }

  public getNavs() {
    return this.authorizationService.getNavs();
  }

  public setDesignId(id) {
    this.designId = id;
  }

  public getDesignId() {
    return this.designId;
  }

  public setEditDesignObj(obj) {
    this.designObj = obj;
  }

  public getEditDesignObj() {
    return this.designObj;
  }

}
