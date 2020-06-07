import { Component, OnInit, Inject } from '@angular/core';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.design = data.design;
  }

  ngOnInit(): void {
  }

  toggleIsComment() {
    this.isComment = !this.isComment;
  }

  approveDesign() {
    // 
  }

  revertDesignToSubmit() {
    // 
  }

  rejectDesign() {
    // 
  }


}
