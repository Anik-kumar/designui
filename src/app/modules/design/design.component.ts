import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ISelect} from '@core/interface/iSelect';
import { DesignService } from './design.service';
import { UploadService } from './upload.service';
import { _, remove, isNil} from 'lodash';
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
  isSuccessful: boolean;
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

}
