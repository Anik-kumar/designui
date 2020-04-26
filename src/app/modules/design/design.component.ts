import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ISelect} from '@core/interface/iSelect';
import { DesignService } from './design.service';
import { UploadService } from './upload.service';
import { _, remove} from 'lodash';
import {AuthorizationService} from '@core/services/authorization.service';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Tags {
  tag: string;
}

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  public sideNavList = [];
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
  sideNavStat;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [];
  // public files = new Map<string, File>();

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private designService: DesignService, 
    private uploadService: UploadService) {
    this.sideNavList = this.designService.getNavs();
  }

  ngOnInit(): void {
    console.log('new design');
    this.newDesignForm = this.formBuilder.group({
      // postTitle: [null, Validators.required],
      title: [null, Validators.required],
      type: [null, Validators.required],
      tags: [null, Validators.required],
      file: [null, Validators.required],
      description: ['']
    });
  }

  /*onSubmit() {
    console.log('Status: ', this.newDesignForm.status, this.newDesignForm.invalid);
    // console.log();
    
    console.log('newDesignForm', this.newDesignForm);
    if (!this.newDesignForm.invalid) {
      let regForm = {
        postTitle: this.newDesignForm.value.postTitle,
        title: this.newDesignForm.value.title,
        type: this.newDesignForm.value.type,
        tags: this.newDesignForm.value.tags,
        file: this.files,
        description: this.newDesignForm.value.describtion
      };
      console.log(regForm);
      // let result = this.uploadFile(this.files, regForm);
      this.designService.designUpload(regForm).subscribe((res) => {
        console.log('Design upload done: ', res);
        // console.log('design com -> ', result);

        if(res._id){
          console.log(res._id);
          this.isFileUploadSuccessful = true;
        }else {
          this.isFileUploadSuccessful = false;
        }
      });
    }
  }*/

  onSubmit() {
    console.log(this.newDesignForm);

    const formData: FormData = new FormData();
    formData.append('file', this.newDesignForm.get('file').value, this.newDesignForm.get('file').value.name);
    formData.append('title', this.newDesignForm.get('title').value);
    formData.append('type', this.newDesignForm.get('type').value);
    formData.append('tags', this.newDesignForm.get('tags').value);
    formData.append('description', this.newDesignForm.get('description').value);
    this.designService.createNewDessign(formData).subscribe(observer => {
      console.log('Response: ', observer);
    });
  }

  public removeFiles(fileName, i) {
    this.files = remove(this.files, function(n) {
      return n.name == fileName;
    });
  }

  public filesAdded(files) {
    console.log('files in parent: ', files);
    this.files = files;
    files.forEach(file => {
      this.newDesignForm.patchValue({file: file});
    });
    this.fileAttached = true;
  }

  public addFiles() {
    console.log('addFiles in parent');
  }

  public uploadFile(files: Set<File>) {
    this.uploadService.upload(this.files)
  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let flag: boolean;
    // console.log(event);
    // console.log(input, value);

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.forEach(tag => {
        if(tag == value) {
          flag = true;
        }else {
          flag = false;
        }
      });

      if(!flag) {
        this.tags.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
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
