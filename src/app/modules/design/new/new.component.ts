import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ISelect} from '@core/interface/iSelect';
import { DesignService } from '../design.service';
import { UploadService } from '../upload.service';
import { remove, isNil} from 'lodash';
import {AuthorizationService} from '@core/services/authorization.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';

export interface Tags {
  tag: string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

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
  // public files = new Map<string, File>();

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private designService: DesignService, 
    private uploadService: UploadService,
    private toastr: ToastrService) {
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
    console.log('tags: ', this.newDesignForm.get('tags').value);
    formData.append('title', this.newDesignForm.get('title').value);
    formData.append('type', this.newDesignForm.get('type').value);
    formData.append('tags', this.newDesignForm.get('tags').value);
    formData.append('description', this.newDesignForm.get('description').value);
    try {
      this.designService.createNewDesign(formData).subscribe(observer => {
        console.log('Response: ', observer);
  
        if(observer.key.includes('design/') && !isNil(observer.Key) && !isNil(observer.Location)) {
          this.isSuccessful = true;
          this.showSuccessMessage();
          this.newDesignForm.reset();
        }else {
          this.isSuccessful = false;
          this.showFailedMessage();
          this.newDesignForm.reset();
        }
      });
    } catch(err) {
      console.log("Error in design ", err);
    }
  }

  public removeFiles(fileName, i) {
    // this.files = remove(this.files, function(n) {
    //   return n.name == fileName;
    // });
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
        console.log(this.newDesignForm);
        if (this.newDesignForm.get('tags').value == null) {
          this.newDesignForm.get('tags').setValue([value.trim()]);
          
        } else {
          let v = this.newDesignForm.get('tags').value;
          v.push(value.trim());
          this.newDesignForm.get('tags').setValue(v);
        }
        this.newDesignForm.get('tags').value;
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
    this.newDesignForm.reset();
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
