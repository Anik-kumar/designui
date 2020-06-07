import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '@core/services/authorization.service';
import { AdminService } from '@modules/admin/admin.service';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-review-design',
  templateUrl: './review-design.component.html',
  styleUrls: ['./review-design.component.scss']
})
export class ReviewDesignComponent implements OnInit {

  userDesigns;
  displayedColumns: string[] = ['design_id', 'title', 'type', 'current_state', 'previous_state', 'reviewButton'];
  submittedDesigns = [];
  dataSource;
  dataSource2;
  submitDataSource;
  submitLength = 0;
  isAdmin = null;
  isReviewer = null;

  @ViewChild(MatPaginator) paginator :MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  // @ViewChildren(MatPaginator) paginator2: MatPaginator;
  // @ViewChildren(MatPaginator) paginator3: MatPaginator;

  constructor(
    private authorizationService: AuthorizationService,
    private adminService: AdminService,
    private matDialog: MatDialog,
    private toastr: ToastrService) { 
      this.isAdmin = adminService.getIsUserAdmin();
      this.isReviewer = adminService.getIsUserReviewer();
  }

  ngOnInit(): void {
    if(this.isAdmin || this.isReviewer) {
      
      this.authorizationService.getUserDesignsUnrestrict().subscribe(observer => {
        // observer { success: .., result: [..] }
        this.userDesigns = observer.data;
        console.log("---> ", this.userDesigns);
  
        this.userDesigns.forEach(design => {
          if(design.whereami.current_state == 'submitted') {
            this.submittedDesigns.push(design);
          }
        });
  
        this.submitDataSource = new MatTableDataSource<any[]>(this.submittedDesigns);
        this.submitLength = this.submittedDesigns.length;
        this.adminService.setDesigns(this.userDesigns);
        this.submitDataSource.paginator = this.paginator;
        this.submitDataSource.sort = this.sort;
        // console.log("submit data source -> ", this.submitDataSource);
        // console.log("submit data source -> ", this.submitDataSource.filteredData);
        // console.log("submit data source -> ", this.submitDataSource.filteredData.length);
      });

    }else {
      // console.log('Permission denied for this action.');
      this.toastr.warning("Permission denied for this action", "Invalid Request");
    }

    
  }


  onClickLaunch(designId, designOwnerId) {
    // alert(designId);
    let tmp;
    this.userDesigns.forEach(design => {
      if(design.design_id === designId) {
        tmp = design;
      }
    });
    this.matDialog.open(ReviewDialogComponent, {
      data: {
        design: tmp
      }
    });
    this.adminService.makeDesignStateReviewing(designId, designOwnerId).subscribe(observer => {
      console.log('onclicklaunch ', observer);
    });
  }

}
