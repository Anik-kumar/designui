import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { isNull, isNil } from 'lodash';
import {AuthService} from '@core/services/auth.service';
import {UserApiService} from '@core/services/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class NewdesignService {

  constructor(private router: Router, private authService: AuthService) { }

  public designUpload(form) {
    return this.authService.designUpload(form);
  }

}
