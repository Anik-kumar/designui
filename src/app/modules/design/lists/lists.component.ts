import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';
import { DesignService } from '@modules/design/design.service';
import { isNil } from 'lodash';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;
  

  sideNavStat;
  public sideNavList = [];
  designs = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private authorizationService: AuthorizationService, 
    private designService: DesignService,
    private router: Router) { 
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
      // console.log("Designs => ", design);
      if(design.success && isNil(design.error)) {
        design.data.result.forEach(designItem => {
          this.designs.push(designItem);
        });
      }
      this.printDesigns();
      // this.row = Math.ceil(this.designs.length / 3);

    });
  }

  printDesigns() {
    console.log("Prints Designs ", this.designs);
  }

  // showSingleDesign(id, title) {
  //   // console.log("Design Id " , id);
  //   title = title.replace('/\s/g', '-');
  //   if(!isNil(id)) {
  //     // this.router.navigate(['/design/show', id]);
  //     this.designService.setDesignId(id);
  //     this.router.navigate(['/design/details', title]);
  //   }
  // }

}
