import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public sideNavList = [];
  constructor(private authorizationService: AuthorizationService) {
    this.sideNavList = this.authorizationService.getNavs();
    console.log(this.sideNavList);
  }

  ngOnInit(): void {
  }

}
