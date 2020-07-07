import { Component, OnInit } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from "@angular/material/sort";
// import { MatTableDataSource } from '@angular/material/table';
// import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '@core/services/authorization.service';
import { AdminService } from '@modules/admin/admin.service';
import { ToastrService } from "ngx-toastr";
import { isNil } from 'lodash';
import { USER_TYPE_TO_TEXT } from "@app/enum/user-type.enum";


@Component({
  selector: 'app-not-verified-user',
  templateUrl: './not-verified-user.component.html',
  styleUrls: ['./not-verified-user.component.scss']
})
export class NotVerifiedUserComponent implements OnInit {

  isAdmin = null;
  isReviewer = null;
  usersList;
  usersListLength = 0;
  usersType = {
    num: String
  };
  typeArr = [];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService) { 
      this.isAdmin = adminService.getIsUserAdmin();
      this.isReviewer = adminService.getIsUserReviewer();
    }

  ngOnInit(): void {
    if(this.isAdmin || this.isReviewer) {
      
      this.adminService.getNotVerifiedUsers().subscribe(observer => {
        // observer { success: .., result: [..] }
        if(isNil(observer.data) || observer.data.length < 1) {
          this.toastr.warning("There are no users", "No Data");
        } else if(observer.success) {
          this.usersList = observer.data;
          console.log("---> ", this.usersList);
          this.usersListLength = this.usersList.length;
          this.usersList.forEach(user => {
            this.usersType[user.user_type] = USER_TYPE_TO_TEXT(user.user_type);
            this.typeArr.push(user.user_type);
          });
          console.log("---> ", this.usersType);
          // this.approvedDesigns = observer.data;
    
          // this.approvedDataSource = new MatTableDataSource<any[]>(this.approvedDesigns);
          // this.approveLength = this.approvedDesigns.length;
          // this.adminService.setDesigns(this.userDesigns);
          // this.approvedDataSource.paginator = this.paginator;
          // this.approvedDataSource.sort = this.sort;
        }else {
          // console.log('Permission denied for this action.');
          this.toastr.warning("Error retrieving users", "Request Failed");
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

  getType(id) {
    let typeText = USER_TYPE_TO_TEXT(id);
    return typeText;
  }
}
