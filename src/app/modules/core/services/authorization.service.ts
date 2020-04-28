import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from '@core/services/local-storage.service';
import {ApiEndpoints} from '@core/api-endpoints';

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
    // AUTHORIZE_NAV
    return this.http.get<any>(ApiEndpoints.AUTHORIZE_NAV, { withCredentials: true });
  }

  public getUserDesigns(): Observable<any> {
    // GET_USERS_DESIGNS
    return this.http.get<any>(ApiEndpoints.GET_USERS_DESIGNS, { withCredentials: true });
  }

  public setNavigations(navs) {
    console.log('setNavigations ---', navs);
    this.leftNavigation = navs;
  }

  public getNavs() {
    console.log('getNavs ---', this.leftNavigation);
    return this.leftNavigation;
  }
}
