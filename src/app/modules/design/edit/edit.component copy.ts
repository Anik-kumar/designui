import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { _, remove, isNil} from 'lodash';

import { DesignService } from '@modules/design/design.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../upload.service';

export interface Tags {
  tag: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  sideNavStat;
  public sideNavList = [];
  userDesignObj = null;
  editDesignForm: FormGroup;
  isSuccessful: boolean;
  btnColor = 'primary';
  types = [{
    viewValue: 'Type 1',
    value: 'type1'
  }, {
    viewValue: 'Type 2',
    value: 'type2'
  }, {
    viewValue: 'Type 3',
    value: 'type3'
  }];

  fileAttached = false;
  public files: Set<File> = new Set();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  isChanged = false;
  isFileChanged = false;
  tags = [];
  oldTitle = "";
  oldType = "";
  oldDescription = "";
  oldFile = "";

  constructor(private router: Router,
    private designService: DesignService,
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder, 
    private uploadService: UploadService,
    private toastr: ToastrService) { 
      this.sideNavList = this.authorizationService.getNavs();
    }

  ngOnInit(): void {
    if(!this.userDesignObj) {
      this.userDesignObj = this.designService.getEditDesignObj();
      console.log(this.userDesignObj);
    }

    if(!this.userDesignObj) {
      console.log("Error retriving design object.");
    }
    this.tags = this.userDesignObj.tags;
    this.oldTitle = this.userDesignObj.title;
    this.oldType = this.userDesignObj.type;
    this.oldDescription = this.userDesignObj.description;
    this.oldFile = this.userDesignObj.raw_design.public_url;
    console.log('edit design');
    this.editDesignForm = this.formBuilder.group({
      // postTitle: [null, Validators.required],
      title: [this.userDesignObj.title, Validators.required],
      type: [this.userDesignObj.type, Validators.required],
      tags: [null, Validators.required],
      file: [null],
      description: [this.userDesignObj.description]
    });
  }

  onSubmit() {
    console.log(this.editDesignForm);

    const formData: FormData = new FormData();
    formData.append('file', this.editDesignForm.get('file').value, this.editDesignForm.get('file').value.name);
    formData.append('title', this.editDesignForm.get('title').value);
    formData.append('type', this.editDesignForm.get('type').value);
    formData.append('tags', this.editDesignForm.get('tags').value);
    formData.append('description', this.editDesignForm.get('description').value);
    this.designService.createNewDessign(formData).subscribe(observer => {
      console.log('Response: ', observer);

      if(observer.key.includes('design/') && !isNil(observer.Key) && !isNil(observer.Location)) {
        this.isSuccessful = true;
        this.showSuccessMessage();
        this.editDesignForm.reset();
      }else {
        this.isSuccessful = false;
        this.showFailedMessage();
        this.editDesignForm.reset();
      }
    });
  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
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
      this.editDesignForm.patchValue({file: file});
    });
    this.fileAttached = true;
  }

  public checkForChange() {
    if(this.oldTitle !== this.editDesignForm.get('title').value) {
      this.isChanged = true;
      console.log("title changed");
    }
    if(this.oldType !== this.editDesignForm.get('type').value) {
      this.isChanged = true;
      console.log("type changed");
    }
    if(this.oldDescription !== this.editDesignForm.get('description').value) {
      this.isChanged = true;
      console.log("description changed");
    }
    this.tags.forEach(tag => {
      this.editDesignForm.get('tags').value.forEach(newTag => {
        if(tag !== newTag) {
          this.isChanged = true;
          console.log("tags changed");
        }
      });
    });
  }

  public checkForFileChange() {
    console.log("files changed");
    console.log(this.editDesignForm.get('files').value);
    console.log(this.oldFile);
  }

  public addFiles() {
    console.log('addFiles in parent');
  }

  public uploadFile(files: Set<File>) {
    this.uploadService.upload(this.files)
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

  changeState() {
    this.editDesignForm.reset();
    this.tags = [];
    this.files = new Set();
    this.fileAttached = false;
    this.isSuccessful = null;
  }

  showSuccessMessage() {
    this.toastr.success("Design is Added", "Success");
  }

  showFailedMessage() {
    this.toastr.error("Design failed to Add", "Error");
  }

}
