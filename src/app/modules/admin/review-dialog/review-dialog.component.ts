import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

  design;
  isComment = false;
  commentForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private formBuilder: FormBuilder) { 
    this.design = data.design;
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      userId: [this.design.user_unique_id , [Validators.required]],
      adminId: [this.design.raw_design.reviewer , [Validators.required]],
      designId: [this.design.design_id, [Validators.required]],
      comment: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
      // this.commentForm.controls.comment.setValue(this.commentForm.value.comment);
      console.log(this.commentForm);
      // this.signupSubscriber$ = this.signupService.signup(regForm).subscribe((res) => {
      //   console.log('Signup done: ', res);

      //   if(res._id){
      //     console.log(res._id);
      //     this.isSignupSuccess = true;
      //   }else {
      //     this.isSignupSuccess = false;
      //   }
      // });
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
