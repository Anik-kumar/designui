import { Component, OnInit } from '@angular/core';
import {IamService} from '@modules/iam/iam.service';

@Component({
  selector: 'app-manage-user-access',
  templateUrl: './manage-user-access.component.html',
  styleUrls: ['./manage-user-access.component.scss']
})
export class ManageUserAccessComponent implements OnInit {
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
