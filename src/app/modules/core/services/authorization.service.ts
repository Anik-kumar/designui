import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '@core/services/local-storage.service';
import { ApiEndpoints } from '@core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient, private localStore: LocalStorageService) { }

  private authorizedRoutes = [];
  private leftNavigation = [];


  public getNavigations(): Observable<any> {
    // AUTHORIZE_ROUTES
    return this.http.get<any>(ApiEndpoints.AUTHORIZE_ROUTES, { withCredentials: true });
  }

  public getAuthorizedRoutes(): Observable<any> {
    console.log('- - - - - - -  getAuthorizedRoutes  - - - - - - - - - - ');
    return this.http.get<any>(ApiEndpoints.AUTHORIZE_NAV, { withCredentials: true });
  }

  public setNavigations(navs) {
    console.log('setNavigations ---', navs);
    this.leftNavigation = navs;
    this.localStore.removeFromLocalStore('nav');
    this.localStore.setToLocalStore('nav', JSON.stringify(navs));
  }

  public getNavs() {
    console.log('getNavs ---', this.leftNavigation);
    return this.leftNavigation;
  }

  public getUserDesigns(): Observable<any> {
    // GET_USERS_DESIGNS
    return this.http.get<any>(ApiEndpoints.GET_USERS_DESIGNS, { withCredentials: true });
  }

  public getUserDesignsUnrestrict(): Observable<any> {
    // GET_USERS_DESIGNS
    return this.http.get<any>(ApiEndpoints.GET_USERS_DESIGNS_UNRESTRICT, { withCredentials: true });
  }

  public getOneUserDesign(designID): Observable<any> {
    return this.http.post<any>(ApiEndpoints.GET_ONE_DESIGN, {'designId': designID}, {withCredentials: true});
  }

  public getUserDesignByTitle(title) {
    return this.http.get<any>(ApiEndpoints.GET_DESIGN_BY_TITLE + title);
  }

  public getUserProfileDetails() {
    return this.http.get<any>(ApiEndpoints.GET_USER_PROFILE);
  }

  public getUserDesignsByState(state) {
    return this.http.post<any>(ApiEndpoints.GET_USERS_DESIGNS_BY_STATE, {"state": state});
  }

  public setUserDesignStateSubmitted(designId, designOwnerId) {
    return this.http.post<any>(ApiEndpoints.MAKE_STATE_SUBMIT + designId, {"designOwnerId": designOwnerId });
  }

  public setUserDesignStateReviewing(designId, designOwnerId) {
    return this.http.post<any>(ApiEndpoints.MAKE_STATE_REVIEW + designId, {"designOwnerId": designOwnerId });
  }

  public setUserDesignStateApproved(designId, designOwnerId) {
    return this.http.post<any>(ApiEndpoints.MAKE_STATE_APPROVE + designId, {"designOwnerId": designOwnerId });
  }

  public setUserDesignStateRejected(designId, designOwnerId) {
    return this.http.post<any>(ApiEndpoints.MAKE_STATE_REJECT + designId, {"designOwnerId": designOwnerId });
  }

}
