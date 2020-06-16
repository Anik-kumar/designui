import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthorizationService} from '@core/services/authorization.service';
import {ApiEndpoints} from '@core/api-endpoints';
import {Observable} from 'rxjs';
import {isNil} from 'lodash';



@Injectable({
  providedIn: 'root'
})
export class IamService {

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }

  public getNavs() {
    return this.authorizationService.getNavs();
  }
}
