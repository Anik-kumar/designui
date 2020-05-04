import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import { LocalStorageService } from '@core/services/local-storage.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private authService: AuthService, private router: Router,  private toastrService: ToastrService, private localStorageService: LocalStorageService, private authorizationService: AuthorizationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated() && this.authService.isAuthenticated();
    const isAuthenticatedLocalStore = this.localStorageService.getLoginStatus();
    if (!isAuthenticated && !isAuthenticatedLocalStore) {
      this.toastrService.error('Please authenticate using signin.');
      return this.router.parseUrl('/signin');
    }
    
    if (this.localStorageService.getLoginStatus()) {
      const user = this.localStorageService.getUserDetails();
      const nav = this.localStorageService.getNav();
      this.authorizationService.setNavigations(nav);
      this.authService.setLoggedInUser(user);
      this.authService.setLoggedInStatus(this.localStorageService.getLoginStatus());
      this.authService.setAuthorizationToken(this.localStorageService.getToken());
    }

    return isAuthenticated || isAuthenticatedLocalStore;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated() && this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.toastrService.error('Please authenticate using signin.');
    }
    return isAuthenticated;
  }
  
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
