import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from '@core/services/local-storage.service';
import {AuthorizationService} from '@core/services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class IamGuardService  implements CanActivate {

  constructor(private authService: AuthService, private router: Router,  private toastrService: ToastrService, private localStorageService: LocalStorageService, private authorizationService: AuthorizationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAdminTypeUser = false;
    if (this.authService.isAdminTypeUser() && (this.authService.isSuperAdminUser() || this.authService.isAdminTypeUser() || this.authService.isReviewer())) {
      isAdminTypeUser = true;
    }

    console.log('IamGuardService => isAdminTypeUser: ', isAdminTypeUser);
    return isAdminTypeUser;
  }
}
