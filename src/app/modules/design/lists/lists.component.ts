import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';
import { DesignService } from '@modules/design/design.service';
import { isNil } from 'lodash';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  sideNavStat;
  public sideNavList = [];
  designs = [];
  counter = 3;
  row;
  column;
  constructor(
    private authorizationService: AuthorizationService, 
    private designService: DesignService) { 
    this.sideNavList = this.authorizationService.getNavs();
    console.log(this.sideNavList);
    this.getUserDesigns();
    
  }

  ngOnInit(): void {

  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
  }

  getUserDesigns() {
    this.authorizationService.getUserDesigns().subscribe(design => {
      console.log("Designs => ", design);
      if(design.success && isNil(design.error)) {
        design.data.result.forEach(designItem => {
          this.designs.push(designItem);
        });
      }
      this.printDesigns();
      this.row = Math.ceil(this.designs.length / 3);

    });
  }

  printDesigns() {
    console.log("Prints Designs ", this.designs);
  }

}
