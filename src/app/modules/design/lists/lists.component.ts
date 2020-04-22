import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  sideNavStat;
  public sideNavList = [];
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
