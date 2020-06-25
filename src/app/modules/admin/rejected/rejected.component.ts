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
import { isNil } from 'lodash';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss']
})
export class RejectedComponent implements OnInit{

  userDesigns;
  displayedColumns: string[] = ['design_id', 'title', 'type', 'current_state', 'previous_state', 'reviewButton'];
  rejectedDesigns = [];
  dataSource;
  rejectedDataSource;
  rejectLength = 0;
  isAdmin = null;
  isReviewer = null;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private authorizationService: AuthorizationService,
    private adminService: AdminService,
    private matDialog: MatDialog,
    private toastr: ToastrService
  ) { 
    this.isAdmin = adminService.getIsUserAdmin();
    this.isReviewer = adminService.getIsUserReviewer();
  }

  ngOnInit(): void {
    if(this.isAdmin || this.isReviewer) {
      
      this.authorizationService.getRejectedDesigns().subscribe(observer => {
        // observer { success: .., result: [..] }
        if(isNil(observer.data) || observer.data.length < 1) {
          this.toastr.warning("There is no designs", "No Data");
        } else if(observer.success) { 
          this.userDesigns = observer.data;
          console.log("---> ", this.userDesigns);
          this.rejectedDesigns = observer.data;
  
          this.rejectedDataSource = new MatTableDataSource<any[]>(this.rejectedDesigns);
          this.rejectLength = this.rejectedDesigns.length;
          this.adminService.setDesigns(this.userDesigns);
          this.rejectedDataSource.paginator = this.paginator;
          this.rejectedDataSource.sort = this.sort;
        }else {
          this.toastr.warning("Error retrieving designs", "Request Failed");
        }
        // console.log("submit data source -> ", this.submitDataSource);
        // console.log("submit data source -> ", this.submitDataSource.filteredData);
        // console.log("submit data source -> ", this.submitDataSource.filteredData.length);
      });

    }else {
      this.toastr.warning("Permission denied for this action", "Invalid Request");
    }
  }


  onClickReviewAgain(designId, designOwnerId) {
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
