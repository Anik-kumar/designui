import { Component, OnInit } from '@angular/core';
import { isNil } from 'lodash';
import { Router } from '@angular/router';
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
  public sideNavList = [];

  constructor(private router: Router,
    private designService: DesignService,
    private authorizationService: AuthorizationService) { 
      this.sideNavList = this.authorizationService.getNavs();
      // console.log(this.sideNavList);
    }

  ngOnInit(): void {
    if(!this.userDesignId) {
      this.userDesignId = this.designService.getDesignId();
    }

    if(this.userDesignId) {
      this.printDesignId();
      this.getDesignInfo();
    }
  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
  }

  printDesignId() {
    console.log("User Design ID ", this.userDesignId);
  }


  getDesignInfo() {
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
    title = title.replace('/\s/g', '-');
    if(!isNil(userDesignObj._id)) {
      // this.router.navigate(['/design/show', id]);
      this.designService.setEditDesignObj(userDesignObj);
      this.router.navigate(['/design/edit', title]);
    }
  }

}
