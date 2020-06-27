import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';

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

  constructor(private authorizationService: AuthorizationService) { 
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


}
