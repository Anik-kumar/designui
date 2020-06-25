import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { ICommentForm } from '@interface/comment.interface';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-confirm-reject',
  templateUrl: './confirm-reject-dialog.component.html',
  styleUrls: ['./confirm-reject-dialog.component.scss']
})
export class ConfirmRejectComponent implements OnInit {
  rejectForm: FormGroup;
  senderId = null;
  receiverId = null;
  designId = null
  dialogRef: MatDialogRef<ConfirmRejectComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    private adminService: AdminService,
    private toastr: ToastrService,
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder) {
      this.senderId = data.sender_id;
      this.receiverId = data.receiver_id;
      this.designId = data.design_id;
    }

  ngOnInit(): void {
    this.rejectForm = this.formBuilder.group({
      sender_id: [this.senderId, [Validators.required]],
      receiver_id: [this.receiverId, [Validators.required]],
      design_id: [this.designId, [Validators.required]],
      comment: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    console.log(this.rejectForm);

    let form: ICommentForm = {
      sender_id: this.senderId,
      receiver_id: this.receiverId,
      design_id: this.designId,
      comment: this.rejectForm.value.comment
    }

    this.adminService.makeCommentOnDesign(form).subscribe(observer => {
      console.log(observer);
      form.comment = "";
      this.rejectForm.controls.comment.reset();      
      this.toastr.success(observer.message, 'Success', {timeOut: 2000});
    });

    this.adminService.makeDesignStateRejected(this.designId, this.receiverId).subscribe(observer => {
      console.log('Design state changed ', observer);
      this.toastr.info(observer.message, "", {timeOut: 7000, progressBar: true});
    });
   
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
