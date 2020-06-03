import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
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
export class ReviewDesignComponent implements OnInit, AfterViewInit {

  userDesigns;
  displayedColumns: string[] = ['design_id', 'title', 'type', 'current_state', 'previous_state', 'reviewButton'];
  submittedDesigns = [];
  approvedDesigns = [];
  rejectedDesigns = [];
  dataSource;
  dataSource2;
  submitDataSource;
  approvedDataSource;
  rejectedDataSource;
  submitLength = 0;
  approveLength = 0;
  rejectLength = 0;
  isAdmin = null;
  isReviewer = null;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();;
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
          if(design.whereami.current_state == 'reviewing') {
            this.submittedDesigns.push(design);
          }
        });
  
        this.userDesigns.forEach(design => {
          if(design.whereami.current_state == 'submitted') {
            this.submittedDesigns.push(design);
          }
        });
  
        this.userDesigns.forEach(design => {
          if(design.whereami.current_state == 'approved') {
            this.approvedDesigns.push(design);
          }
        });
  
        this.userDesigns.forEach(design => {
          if(design.whereami.current_state == 'rejected') {
            this.rejectedDesigns.push(design);
          }
        });
        this.submitDataSource = new MatTableDataSource<any[]>(this.submittedDesigns);
        this.approvedDataSource = new MatTableDataSource<any[]>(this.approvedDesigns);
        this.rejectedDataSource = new MatTableDataSource<any[]>(this.rejectedDesigns);
        this.submitLength = this.submittedDesigns.length;
        this.approveLength = this.approvedDesigns.length;
        this.rejectLength = this.rejectedDesigns.length;
        this.adminService.setDesigns(this.userDesigns);
        // console.log("submit data source -> ", this.submitDataSource);
        // console.log("submit data source -> ", this.submitDataSource.filteredData);
        // console.log("submit data source -> ", this.submitDataSource.filteredData.length);
      });

    }else {
      // console.log('Permission denied for this action.');
      this.toastr.warning("Permission denied for this action", "Invalid Request");
    }

    
  }

  ngAfterViewInit() {
    this.submitDataSource.paginator = this.paginator.toArray()[0];
    this.approvedDataSource.paginator = this.paginator.toArray()[1];
    this.rejectedDataSource.paginator = this.paginator.toArray()[2];
  }

  onClickLaunch(designId) {
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
    this.adminService.makeDesignStateReviewing(designId).subscribe(observer => {
      console.log('onclicklaunch ', observer);
    });
  }

}
