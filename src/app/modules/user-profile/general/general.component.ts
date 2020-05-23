import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '@modules/user-profile/user-profile.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  profileData;
  profileDesigns;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    console.log('user-profile/general');
    if(!this.profileData) {
      this.profileData = this.userProfileService.getUserProfileDetails();
    }
    if(!this.profileDesigns) {
      this.profileDesigns = this.userProfileService.getUserDesignDetails();
    }
    console.log('profileData ', this.profileData);
    console.log('profileDesigns ', this.profileDesigns);
  }

}
