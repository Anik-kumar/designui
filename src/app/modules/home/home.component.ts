import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';
import { HomeService } from '@modules/home/home.service';
import { isNil } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sideNavList = [];
  sideNavStat;
  publicDesigns = null;
  publicDesignsLength = 0;

  constructor(private authorizationService: AuthorizationService,
    private homeService: HomeService,
    private router: Router) { 
    this.sideNavList = this.authorizationService.getNavs();
    // console.log(this.sideNavList);
  }

  ngOnInit(): void {
    this.authorizationService.getAllPublicDesigns().subscribe(observer => {
      this.publicDesigns = observer.data;
      console.log(this.publicDesigns);
      this.publicDesignsLength = this.publicDesigns.length;
    });
  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
  }

  getDate(isoDate) {
    let date;
    let day = new Date(isoDate).getDate();
    let month = new Date(isoDate).getMonth();
    let year = new Date(isoDate).getFullYear();
    date = day+'.'+month+'.'+year;
    return date;
  }

  getTimeToText(isoDate) {
    let date;
    date = new Date(isoDate).toLocaleTimeString('en-US');
    return date;
  }

  viewDesignDetails(id, title) {
    // console.log("Design Id " , id);
    // title = title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    // console.log("inner list clicked");
    if(!isNil(id)) {
      this.homeService.setDesignId(id);
      this.router.navigate(['/design/details', title]);
      // console.log("inner list clicked");
    }
  }

}
