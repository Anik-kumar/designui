import { Component, OnInit } from '@angular/core';
import { isNil } from 'lodash';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { observable, from } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LocalStorageService } from '@core/services/local-storage.service';
import { ICommentForm } from '@interface/comment.interface';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-design-info',
  templateUrl: './design-info.component.html',
  styleUrls: ['./design-info.component.scss']
})
export class DesignInfoComponent implements OnInit {

  design = null;
  designId = null;
  isComment = false;
  commentForm: FormGroup;
  loggedInUser = null;


  constructor(private router: Router,
    private adminService: AdminService,
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder,
    private localService: LocalStorageService,
    private toastr: ToastrService) { 
      this.loggedInUser = localService.getUserDetails();
      console.log("signed in user -> " , this.loggedInUser);
    }

  ngOnInit(): void {
    // console.log("design-info ", this.router.url);
    this.commentForm = this.formBuilder.group({
      sender_id: [null, [Validators.required]],
      receiver_id: [null, [Validators.required]],
      design_id: [null, [Validators.required]],
      comment: [null, [Validators.required, Validators.minLength(5)]]
    });
    

    if(isNil(this.designId) && isNil(this.design)) {
      let tmpUrl = this.router.url.trim().split('/');
      this.designId = tmpUrl[tmpUrl.length - 1];
      // console.log("design-info ", this.designId);

      this.adminService.getUserDesignInfo(this.designId).subscribe(observer => {
        console.log(observer);
        if(observer.success) {
          this.design = observer.data;
          console.log(this.design);
          // this.commentForm.controls.receiverId.setValue(this.design.user_unique_id);
          // this.commentForm.controls.designId.setValue(this.design.design_id);
          // this.commentForm.controls.senderId.setValue(this.loggedInUser.unique_id);
          
        }
      });
    }

  }


  onSubmit() {

    // console.log(this.commentForm);
    let form: ICommentForm = {
      sender_id: this.loggedInUser.unique_id,
      receiver_id: this.design.user_unique_id,
      design_id: this.design.design_id,
      comment: this.commentForm.value.comment
    }
    this.adminService.makeDesignStateReviewing(this.design.design_id, this.design.user_unique_id).subscribe(observer => {
      console.log('Design state changed ', observer);
      this.toastr.info(observer.message, "", {timeOut: 2500});
    });

    this.adminService.makeCommentOnDesign(form).subscribe(observer => {
      console.log(observer);
      form.comment = "";
      this.commentForm.controls.comment.reset();      
      this.toastr.success(observer.message, 'Success', {timeOut: 7000, progressBar: true});
    });
  
  }

  toggleIsComment() {
    this.isComment = !this.isComment;
  }

  approveDesign() {
    // 
    console.log(this.commentForm);
  }

  revertDesignToSubmit() {
    // 
  }

  rejectDesign() {
    // 
  }

}
