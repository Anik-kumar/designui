import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-all-submitted',
  templateUrl: './all-submitted.component.html',
  styleUrls: ['./all-submitted.component.scss']
})
export class AllSubmittedComponent implements OnInit {

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

  constructor(private authorizationService: AuthorizationService,
    private adminService: AdminService,
    private matDialog: MatDialog,
    private toastr: ToastrService) { 
      this.isAdmin = adminService.getIsUserAdmin();
      // this.isReviewer = adminService.getIsUserReviewer();
    }

  ngOnInit(): void {
    if(this.isAdmin) {
      
      this.authorizationService.getUserDesignsByState('submitted').subscribe(observer => {
        // observer { success: .., result: [..] }
        if(isNil(observer.data) || observer.data.length < 1) {
          this.toastr.warning("There is no designs", "No Data");
        } else if(observer.success) {
          this.userDesigns = observer.data;
          console.log("---> ", this.userDesigns);
          this.submittedDesigns = observer.data;
    
          this.submitDataSource = new MatTableDataSource<any[]>(this.submittedDesigns);
          this.submitLength = this.submittedDesigns.length;
          this.adminService.setDesigns(this.userDesigns);
          this.submitDataSource.paginator = this.paginator;
          this.submitDataSource.sort = this.sort;
        } else {
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

}
