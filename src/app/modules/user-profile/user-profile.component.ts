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
  userProfile;
  userDetails;
  activeClassList = [
    {name: 'basic', title: 'Basics', link: 'basic', value: true},
    {name: 'pass', title: 'Change Password', link: 'password', value: false},
    {name: 'advance', title: 'Advanced', link: 'advance', value: false},
  ];
  constructor(private authorizationService: AuthorizationService,
    private userProfileService: UserProfileService) {
    this.sideNavList = this.userProfileService.getNavs();
    console.log(this.sideNavList);
    console.log('user-profile');
    this.setUserProfileData();
    this.setUserProfileDesigns();
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

  setUserProfileData() {
    
    this.userProfileService._getUserProfileData().subscribe(observer => {
      this.userProfile = observer.data;
      console.log("---> ", this.userProfile);
      this.userProfileService.setUserProfileDetails(observer.data);
    });
  }

  setUserProfileDesigns() {
    this.userProfileService._getUserProfileDesigns().subscribe(observer => {
      this.userDetails = observer.data.result;
      console.log("---> ", this.userDetails);
      this.userProfileService.setUserDesignDetails(observer.data.result);
    });
  }

}
