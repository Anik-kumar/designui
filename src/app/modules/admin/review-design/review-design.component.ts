import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorizationService } from '@core/services/authorization.service';
import { AdminService } from '@modules/admin/admin.service';

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

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();;
  // @ViewChildren(MatPaginator) paginator2: MatPaginator;
  // @ViewChildren(MatPaginator) paginator3: MatPaginator;

  constructor(
    private authorizationService: AuthorizationService,
    private adminService: AdminService) 
  { }

  ngOnInit(): void {
    this.userDesigns = this.authorizationService.getUserDesigns().subscribe(observer => {
      // observer { success: .., result: [..] }
      this.userDesigns = observer.data.result;
      console.log("---> ", this.userDesigns);
      observer.data.result.forEach(design => {
        if(design.whereami.current_state == 'reviewing') {
          this.submittedDesigns.push(design);
        }
      });

      observer.data.result.forEach(design => {
        if(design.whereami.current_state == 'submitted') {
          this.submittedDesigns.push(design);
        }
      });

      observer.data.result.forEach(design => {
        if(design.whereami.current_state == 'approved') {
          this.approvedDesigns.push(design);
        }
      });

      observer.data.result.forEach(design => {
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
      this.adminService.setDesigns(observer.data.result);
      // console.log("submit data source -> ", this.submitDataSource);
      // console.log("submit data source -> ", this.submitDataSource.filteredData);
      // console.log("submit data source -> ", this.submitDataSource.filteredData.length);
    });
    
  }

  ngAfterViewInit() {
    this.submitDataSource.paginator = this.paginator.toArray()[0];
    this.approvedDataSource.paginator = this.paginator.toArray()[1];
    this.rejectedDataSource.paginator = this.paginator.toArray()[2];
  }

  onClickLaunch(designId) {
    // alert(designId);
    this.adminService.makeDesignStateReviewing(designId).subscribe(observer => {
      console.log('onclicklaunch ', observer);
    });
  }

}
