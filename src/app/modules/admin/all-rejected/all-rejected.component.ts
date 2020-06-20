import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
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
  selector: 'app-all-rejected',
  templateUrl: './all-rejected.component.html',
  styleUrls: ['./all-rejected.component.scss']
})
export class AllRejectedComponent implements OnInit {

  userDesigns;
  displayedColumns: string[] = ['design_id', 'title', 'type', 'current_state', 'previous_state', 'reviewButton'];
  rejectedDesigns = [];
  dataSource;
  rejectedDataSource;
  rejectedLength = 0;
  isAdmin = null;
  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private authorizationService: AuthorizationService,
    private adminService: AdminService,
    private matDialog: MatDialog,
    private toastr: ToastrService) { 
      this.isAdmin = adminService.getIsUserAdmin();
    }

  ngOnInit(): void {
    if(this.isAdmin) {
      
      this.authorizationService.getUserDesignsByState('rejected').subscribe(observer => {
        // observer { success: .., result: [..] }
        if(isNil(observer.data) || observer.data.length < 1) {
          this.toastr.warning("There is no designs", "No Data");
        } else if(observer.success) { 
          this.userDesigns = observer.data;
          console.log("---> ", this.userDesigns);
          this.rejectedDesigns = observer.data;
  
          this.rejectedDataSource = new MatTableDataSource<any[]>(this.rejectedDesigns);
          this.rejectedLength = this.rejectedDesigns.length;
          this.adminService.setDesigns(this.userDesigns);
          this.rejectedDataSource.paginator = this.paginator;
          this.rejectedDataSource.sort = this.sort;
        }else {
        //   // console.log('Permission denied for this action.');
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
