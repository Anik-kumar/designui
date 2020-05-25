import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';
import { AdminService } from '@modules/admin/admin.service';

@Component({
  selector: 'app-review-design',
  templateUrl: './review-design.component.html',
  styleUrls: ['./review-design.component.scss']
})
export class ReviewDesignComponent implements OnInit {

  userDesigns;

  constructor(
    private authorizationService: AuthorizationService,
    private adminService: AdminService) 
  { }

  ngOnInit(): void {
    this.userDesigns = this.authorizationService.getUserDesigns().subscribe(observer => {
      // observer { success: .., result: [..] }
      this.userDesigns = observer.data.result;
      console.log("---> ", this.userDesigns);
      this.adminService.setDesigns(observer.data.result);
    });
  }

}
