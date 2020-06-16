import { Component, OnInit } from '@angular/core';
import {IamService} from '@modules/iam/iam.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  public sideNavStat;
  public sideNavList = [];

  constructor(private iamService: IamService) {
    this.sideNavList = this.iamService.getNavs();
  }

  ngOnInit(): void {

  }

  toggleNavClass(event) {
    this.sideNavStat = event;
  }

}
