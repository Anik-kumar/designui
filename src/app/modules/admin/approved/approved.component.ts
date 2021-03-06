import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '@core/services/authorization.service';
import { AdminService } from '@modules/admin/admin.service';
import { ToastrService } from "ngx-toastr";
import { isNil } from 'lodash';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss']
})
export class ApprovedComponent implements OnInit {

  userDesigns;
  displayedColumns: string[] = ['design_id', 'title', 'type', 'current_state', 'previous_state', 'reviewButton'];
  approvedDesigns = [];
  dataSource;
  approvedDataSource;
  approveLength = 0;
  isAdmin = null;
  isReviewer = null;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private authorizationService: AuthorizationService,
    private adminService: AdminService,
    private matDialog: MatDialog,
    private toastr: ToastrService) { 
      this.isAdmin = adminService.getIsUserAdmin();
      this.isReviewer = adminService.getIsUserReviewer();
    }

  ngOnInit(): void {
    if(this.isAdmin || this.isReviewer) {
      
      this.authorizationService.getApprovedDesigns().subscribe(observer => {
        // observer { success: .., result: [..] }
        if(isNil(observer.data) || observer.data.length < 1) {
          this.toastr.warning("There is no designs", "No Data");
        } else if(observer.success) {
          this.userDesigns = observer.data;
          // console.log("---> ", this.userDesigns);
          this.approvedDesigns = observer.data;
    
          this.approvedDataSource = new MatTableDataSource<any[]>(this.approvedDesigns);
          this.approveLength = this.approvedDesigns.length;
          this.adminService.setDesigns(this.userDesigns);
          this.approvedDataSource.paginator = this.paginator;
          this.approvedDataSource.sort = this.sort;
        }else {
          // console.log('Permission denied for this action.');
          this.toastr.warning("Error retrieving designs", "Request Failed");
        }
        // console.log("submit data source -> ", this.submitDataSource);
        // console.log("submit data source -> ", this.submitDataSource.filteredData);
        // console.log("submit data source -> ", this.submitDataSource.filteredData.length);
      });

    }else {
      // console.log('Permission denied for this action.');
      this.toastr.warning("Permission denied for this action", "Invalid Request");
    }
  }


  onClickReview(designId, designOwnerId) {
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
