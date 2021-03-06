import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { AdminService } from "./admin.service";
import { USER_TYPE } from '@app/enum/user-type.enum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public sideNavList = [];
  sideNavStat;

  constructor(private authorizationService: AuthorizationService,
    private localStorage: LocalStorageService,
    private adminService: AdminService) {
    this.sideNavList = this.authorizationService.getNavs();
    // console.log(this.sideNavList);
    this.checkUserType();
  }

  ngOnInit(): void {
  }

  toggleNavClass(event) {
    // console.log(event);
    this.sideNavStat = event;
  }

  checkUserType() {
    const tmpUser = this.localStorage.getUserDetails();
    // console.log('Current User Details -> ', tmpUser);
    if(tmpUser.type >= USER_TYPE.ADMIN) {
      this.adminService.setIsUserAdmin(true);
    }
    if(tmpUser.type >= USER_TYPE.REVIEWER) {
      this.adminService.setIsUserReviewer(true);
    }
  }

}
