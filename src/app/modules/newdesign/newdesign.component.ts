import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ISelect} from '@core/interface/iSelect';
import { NewdesignService } from './newdesign.service';
import { UploadService } from './upload.service';
import { remove} from 'lodash'

@Component({
  selector: 'app-newdesign',
  templateUrl: './newdesign.component.html',
  styleUrls: ['./newdesign.component.scss']
})
export class NewdesignComponent implements OnInit {

  newDesignForm: FormGroup;
  fileAttached = false;
  isFileUploadSuccessful = false;
  btnColor = 'primary';
  types: ISelect[] = [{
    viewValue: 'Type 1',
    value: 'type1'
  }, {
    viewValue: 'Type 2',
    value: 'type2'
  }, {
    viewValue: 'Type 3',
    value: 'type3'
  }];
  public files: Set<File> = new Set();
  // public files = new Map<string, File>();

  constructor(private router: Router, private formBuilder: FormBuilder, private newdesignService: NewdesignService, private uploadService: UploadService) { 

  }

  ngOnInit(): void {
    console.log('new design');
    this.newDesignForm = this.formBuilder.group({
      type: ['', Validators.required],
      tags: ['', Validators.required],
      name: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Status: ', this.newDesignForm.status, this.newDesignForm.invalid);
    this.uploadFile(this.files);
    // console.log('signupForm', this.signupForm);
    // if (!this.newDesignForm.invalid) {
    //   let regForm = {
    //     name: this.newDesignForm.value.designName,
    //     type: this.newDesignForm.value.designType,
    //     file: this.newDesignForm.value.designFile,
    //     tags: this.newDesignForm.value.designTags
    //   };
    //   console.log(regForm);
    //   // this.newdesignService.designUpload(regForm).subscribe((res) => {
    //   //   console.log('Signup done: ', res);

    //   //   if(res._id){
    //   //     console.log(res._id);
    //   //     this.isFileUploadSuccessful = true;
    //   //   }else {
    //   //     this.isFileUploadSuccessful = false;
    //   //   }
    //   // });
    // }

  }

  public removeFiles(fileName, i) {
    // this.files = remove(this.files, function(n) {
    //   return n.name == fileName;
    // });
  }

  public filesAdded(files) {
    console.log('files in parent: ', files);
    this.files = files;
  }

  public addFiles() {
    console.log('addFiles in parent');
  }

  public uploadFile(files: Set<File>) {
    this.uploadService.upload(this.files)
  }

  /*startUpload() {
    // // if everything was uploaded already, just close the dialog
    // if (this.uploadSuccessful) {
    //   return this.dialogRef.close();
    // }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files);
    console.log(this.progress);
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }*/
}
