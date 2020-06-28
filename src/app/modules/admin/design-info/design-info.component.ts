import { Component, OnInit, Inject } from '@angular/core';
import { isNil } from 'lodash';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { observable, from } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LocalStorageService } from '@core/services/local-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { ICommentForm } from '@interface/comment.interface';
import { ToastrService } from "ngx-toastr";
import { ConfirmRejectComponent } from '../confirm-reject-dialog/confirm-reject-dialog.component';
import { faOm } from '@fortawesome/free-solid-svg-icons';

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
  prevComments = null;
  prevCommentsLength = 0;
  user1 = {
    id: String,
    name: String,
    details: Object
  };
  user2 = {
    id: String,
    name: String,
    details: Object
  }


  constructor(private router: Router,
    private adminService: AdminService,
    private authorizationService: AuthorizationService, 
    private formBuilder: FormBuilder,
    private localService: LocalStorageService,
    private toastr: ToastrService,
    public dialog: MatDialog) { 
      this.loggedInUser = localService.getUserDetails();
      // console.log("signed in user -> " , this.loggedInUser);
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

      this.getPreviousComments();
    }



  }


  onSubmitComment() {

    // console.log(this.commentForm);
    let form: ICommentForm = {
      sender_id: this.loggedInUser.unique_id,
      receiver_id: this.design.user_unique_id,
      design_id: this.design.design_id,
      comment: this.commentForm.value.comment
    };

    this.adminService.makeDesignStateReviewing(this.design.design_id, this.design.user_unique_id).subscribe(observer => {
      console.log('Design state changed ', observer);
      this.toastr.success(observer.message, 'Success', {timeOut: 7000, progressBar: true});
    });

    this.doComment(form);
  
  }

  doComment(form) {
    this.adminService.makeCommentOnDesign(form).subscribe(observer => {
      console.log(observer);
      form.comment = "";
      this.commentForm.controls.comment.reset();      
      this.toastr.info(observer.message, "", {timeOut: 1500});
    });
  }

  toggleIsComment() {
    this.isComment = !this.isComment;
  }

  approveDesign() {
    
    let adminId = this.loggedInUser.unique_id;
    let adminType = this.loggedInUser.type;
    this.adminService.makeDesignStateApproved(this.design.design_id, this.design.user_unique_id).subscribe(observer => {
      console.log("Approve design result -> ", observer);
      if(observer.success) {
        this.toastr.success(observer.message, 'Success', {timeOut: 7000, progressBar: true});
      }else {
        this.toastr.error(observer.message, 'Error', {timeOut: 7000, progressBar: true});
      }
    });
  }

  revertDesignToSubmit() {
    this.adminService.makeDesignStateSubmitted(this.design.design_id, this.design.user_unique_id).subscribe(observer => {
      console.log("Submitted design result -> ", observer);
      if(observer.success) {
        this.toastr.success(observer.message, 'Success', {timeOut: 7000, progressBar: true});
      }else {
        this.toastr.error(observer.message, 'Error', {timeOut: 7000, progressBar: true});
      }
    });
  }

  // reject is done by confirm modal
  /* rejectDesign() {
    let commentReject = prompt("Write a comment for rejecting: ");

    let form: ICommentForm = {
      sender_id: this.loggedInUser.unique_id,
      receiver_id: this.design.user_unique_id,
      design_id: this.design.design_id,
      comment: commentReject
    };
    
    if(!isNil(commentReject)) {
      this.adminService.makeCommentOnDesign(form).subscribe(observer => {
        console.log(observer);
        form.comment = "";
        this.commentForm.controls.comment.reset();      
        this.toastr.success(observer.message, 'Success', {timeOut: 7000, progressBar: true});
      });

      this.adminService.makeDesignStateRejected(this.design.design_id, this.design.user_unique_id).subscribe(observer => {
        console.log("Rejected design result -> ", observer);
        if(observer.success) {
          this.toastr.success(observer.message, 'Success', {timeOut: 7000, progressBar: true});
        }else {
          this.toastr.error(observer.message, 'Error', {timeOut: 7000, progressBar: true});
        }
      });
    }
  } */

  prompt() {
    let message = prompt("Write a comment for rejecting: ");
    alert(message);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmRejectComponent, {
      width: '500px',
      data: {
        sender_id: this.loggedInUser.unique_id,
        receiver_id: this.design.user_unique_id,
        design_id: this.design.design_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // alert(result);
    });
  }


  getPreviousComments() {
    this.adminService.getPreviousComments(this.designId).subscribe(observer => {

      if(observer.success) {
        this.prevComments = observer.data;
        console.log("Comments ", this.prevComments);
        // console.log("Comments ", observer);
        this.prevCommentsLength = this.prevComments.length;
        this.getSenderReceiverDetails();
      }
    });
  }

  getSenderReceiverDetails() {
    this.adminService.getUserDetails(this.prevComments[this.prevCommentsLength-1].from_user_id).subscribe(observer => {
      this.user1.id = this.prevComments[this.prevCommentsLength-1].from_user_id;
      this.user1.details = observer.data;
      this.user1.name = observer.data.name.first ;

      console.log(this.user1);
    });

    this.adminService.getUserDetails(this.prevComments[this.prevCommentsLength-1].to_user_id).subscribe(observer => {
      this.user2.id = this.prevComments[this.prevCommentsLength-1].to_user_id;
      this.user2.details = observer.data;
      this.user2.name = observer.data.name.first ;

      console.log(this.user2);
    });
  }

}


