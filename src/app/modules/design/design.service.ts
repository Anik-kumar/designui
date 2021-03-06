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
  designObj: object;

  constructor(private router: Router, private authService: AuthService, private authorizationService: AuthorizationService, private uploadService: UploadService) { }

  public designUpload(form) {
    return this.authService.designUpload(form);
  }

  public getNavs() {
    return this.authorizationService.getNavs();
  }

  public createNewDesign(formData: FormData) {
    return this.uploadService.createDesign(formData);
  }

  public updateDesign(data: any, isFileAttach: boolean) {
    return this.uploadService.updateDesign(data, isFileAttach);
  }

  public getUserDesigns() {
    return this.authorizationService.getUserDesigns();
  }

  public getOneUserDesign(design) {
    return this.authorizationService.getOneUserDesign(design);
  }

  public getUserDesignByTitle(title) {
    return this.authorizationService.getUserDesignByTitle(title);
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
