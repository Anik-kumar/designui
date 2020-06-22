import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull, isNil } from 'lodash';
import { AuthService } from '@core/services/auth.service';
import { UserApiService } from '@core/services/user-api.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { ICommentForm } from '@interface/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private designs;
  private isUserAdmin = null;
  private isUserReviewer = null;

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

  makeDesignStateReviewing(designId, designOwnerId): Observable<any> {
    return this.authorizationService.setUserDesignStateReviewing(designId, designOwnerId);
  }

  setIsUserAdmin(value) {
    this.isUserAdmin = value;
  }

  getIsUserAdmin() {
    return this.isUserAdmin;
  }

  setIsUserReviewer(value) {
    this.isUserReviewer = value;
  }

  getIsUserReviewer() {
    return this.isUserReviewer;
  }

  getUserDesignInfo(designId): Observable<any> {
    return this.authorizationService.getOneUserDesignAsAdmin(designId);
  }
  
  makeCommentOnDesign(formData: ICommentForm): Observable<any> {
    return this.authorizationService.makeCommentOnUserDesign(formData);
  }

}
