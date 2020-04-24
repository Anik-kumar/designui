import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public sideNavList = [];
  sideNavStat;
  constructor(private authorizationService: AuthorizationService) {
    this.sideNavList = this.authorizationService.getNavs();
    console.log(this.sideNavList);
  }

  ngOnInit(): void {
  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
  }

}
