import { Component, OnInit } from '@angular/core';
import { isNil } from 'lodash';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignService } from '@modules/design/design.service';
import { AuthorizationService } from '@core/services/authorization.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  userDesignId = null;
  userDesign = null;
  createDate = null;
  year = null;
  month = null;
  day = null;
  date = null;
  time = null;
  userPhotos = [];
  sideNavStat;
  userDesignTitle = null;
  public sideNavList = [];

  constructor(private router: Router,
    private designService: DesignService,
    private authorizationService: AuthorizationService,
    private activatedRoute: ActivatedRoute) { 
      this.sideNavList = this.authorizationService.getNavs();
      // console.log(this.sideNavList);

    }

  ngOnInit(): void {    
    // console.log('url -> ' , this.router.url);
    // console.log('url -> ' , tmpUrl);
    // console.log('url -> ' , this.userDesignTitle);

    if(!this.userDesignId) {
      this.userDesignId = this.designService.getDesignId();  
    }
    
    if(!isNil(this.userDesignId)) {
      // this.printDesignId();
      this.getDesignInfoById();
    }

    if(isNil(this.userDesignId) && isNil(this.userDesign)){
      let tmpUrl = this.router.url.trim().split('/');
      this.userDesignTitle = tmpUrl[tmpUrl.length-1];
      if(!isNil(this.userDesignTitle)) {
        this.getDesignInfoByTitle();
      }
    }
  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
  }

  printDesignId() {
    console.log("User Design ID ", this.userDesignId);
  }


  getDesignInfoByTitle() {
    this.designService.getUserDesignByTitle(this.userDesignTitle).subscribe(observer => {
      console.log("Observer => ", observer);
      this.userDesign = observer.data;
      this.createDate = new Date(observer.data.date_created);
      // console.log(" => ", this.createDate);
      this.date = this.createDate.toLocaleDateString();
      this.time = this.createDate.toLocaleTimeString();
      this.userPhotos = observer.data.photos;
    });
  }

  getDesignInfoById() {
    this.designService.getOneUserDesign(this.userDesignId).subscribe(observer => {
      console.log("Observer => ", observer);
      this.userDesign = observer.data;
      this.createDate = new Date(observer.data.date_created);
      console.log(" => ", this.createDate);
      this.date = this.createDate.toLocaleDateString();
      this.time = this.createDate.toLocaleTimeString();
      this.userPhotos = observer.data.photos;
    });
  }
  
  editDesign(userDesignObj, title) {
    title = title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    if(!isNil(userDesignObj._id)) {
      // this.router.navigate(['/design/show', id]);
      this.designService.setEditDesignObj(userDesignObj);
      this.router.navigate(['/design/edit', title]);
    }
  }

}
