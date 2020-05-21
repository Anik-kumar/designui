import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';
import { UserProfileService } from '@modules/user-profile/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public sideNavList = [];
  sideNavStat;
  activeClassList = [
    {name: 'basic', title: 'Basics', link: 'basic', value: true},
    {name: 'pass', title: 'Change Password', link: 'password', value: false},
    {name: 'advance', title: 'Advanced', link: 'advance', value: false},
  ];
  constructor(private authorizationService: AuthorizationService,
    private userProfileService: UserProfileService) {
    this.sideNavList = this.userProfileService.getNavs();
    console.log(this.sideNavList);
  }

  ngOnInit(): void {
  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
  }

  toggleActiveClass(item) {
    item.value = !item.value;
    this.activeClassList.forEach(element => {
      if(item.name != element.name && element.value == true) {
        element.value = !element.value;
      }
    });
  }

}
