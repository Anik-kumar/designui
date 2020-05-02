import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull, isNil } from 'lodash';
import { AuthService } from '@core/services/auth.service';
import { UserApiService } from '@core/services/user-api.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  designId: string;

  constructor(private router: Router, private authService: AuthService, private authorizationService: AuthorizationService, private uploadService: UploadService) { }

  public designUpload(form) {
    return this.authService.designUpload(form);
  }

  public getNavs() {
    return this.authorizationService.getNavs();
  }

  public createNewDessign(formData: FormData) {
    return this.uploadService.createDesign(formData);
  }

  public getUserDesigns() {
    return this.authorizationService.getUserDesigns();
  }

  public getOneUserDesign(design) {
    return this.authorizationService.getOneUserDesign(design);
  }

  public setDesignId(id) {
    this.designId = id;
  }

  public getDesignId() {
    return this.designId;
  }

}
