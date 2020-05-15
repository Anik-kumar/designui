import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { remove, isNil, cloneDeep } from 'lodash';


import { DesignService } from '@modules/design/design.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../upload.service';
import { DesignFormInterface } from '@app/interface/design-form.interface';

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
  initialData: DesignFormInterface = {
    title: '',
    tags: [],
    type: '',
    description: '',
    file: null,
    publicUrl: ''
  }

  constructor(private router: Router,
    private designService: DesignService,
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder, 
    private uploadService: UploadService,
    private toastr: ToastrService) { 
      this.sideNavList = this.authorizationService.getNavs();
      console.log('edit design');
    }

  ngOnInit(): void {
    if(!this.userDesignObj) {
      this.userDesignObj = this.designService.getEditDesignObj();
      console.log('---- Parent ngOnInit: userDesignObj: ', this.userDesignObj);
    }

    if(!this.userDesignObj) {
      console.log("Error retriving design object.");
    }
    this.initialData.title = this.userDesignObj.title;
    this.initialData.type = this.userDesignObj.type;
    this.initialData.tags = this.userDesignObj.tags;
    this.initialData.description = this.userDesignObj.description;
    this.initialData.publicUrl = this.userDesignObj.raw_design.public_url;
    
    console.log('---- Parent ngOnInit: initialData: ', this.initialData);

    this.tags = this.userDesignObj.tags;
    
    this.editDesignForm = this.formBuilder.group({
      // postTitle: [null, Validators.required],
      title: [this.userDesignObj.title, Validators.required],
      type: [this.userDesignObj.type, Validators.required],
      tags: [this.userDesignObj.tags, Validators.required],
      file: [null],
      description: [this.userDesignObj.description]
    });
  }

  onSubmit(editForm: FormGroup) {
    console.log('--- Edit Com. On Submit: ', editForm);
    //console.log(this.editDesignForm);

    let formData: FormData = new FormData();
    // console.log('title',editForm.get('title'));
    // console.log('title v',editForm.get('title').value);

    //formData.append('title', editForm.get('title').value);
    // formData.append('test', "test 13");
    if(editForm.get('file').value && editForm.get('file').value.name) {
      this.fileAttached = true;
    }
    let data = {};
    if(this.fileAttached) {
      formData.append('file', editForm.get('file').value, editForm.get('file').value.name);
      formData.append('title', editForm.get('title').value);
      formData.append('type', editForm.get('type').value);
      formData.append('tags', editForm.get('tags').value);
      formData.append('description', editForm.get('description').value);
      formData.append('design_id', this.userDesignObj.design_id);
      data = formData;
    }
    if(!this.fileAttached) {
      data['title'] = editForm.value.title;
      data['type'] = editForm.value.type;
      data['tags'] = editForm.value.tags;
      data['description'] = editForm.value.description;
      data['design_id'] = this.userDesignObj.design_id;
    }
    console.log("Json Data ", data);
    let uri_title = editForm.get('title').value.trim().replace(/ /g, "-").toLowerCase();
    // for (var value of formData.values()) {
    //   console.log(value); 
    // }

    this.designService.updateDesign(data, this.fileAttached).subscribe(observer => {
      console.log('Edit Response: ', observer);

      if(this.fileAttached) {
        if(observer.key.includes('design/') && !isNil(observer.Key) && !isNil(observer.Location)) {
          this.isSuccessful = true;
          this.showSuccessMessage(observer.message);
          this.editDesignForm.reset();
  
          this.router.navigate(['/design/details/'+uri_title]);
        }else {
          this.isSuccessful = false;
          this.showFailedMessage(observer.message);
          this.editDesignForm.reset();
        }
      } else {
        if(observer.success && observer.error==null) {
          this.isSuccessful = true;
          this.showSuccessMessage(observer.message);
          this.editDesignForm.reset();
  
          this.router.navigate(['/design/details/'+uri_title]);
        }else {
          this.isSuccessful = false;
          this.showFailedMessage(observer.message);
          this.editDesignForm.reset();
        }
      }
    });
  }

  toggleNavClass(event) {
    console.log(event);
    this.sideNavStat = event;
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
      this.editDesignForm.patchValue({file: file});
    });
    this.fileAttached = true;
  }

  public checkForChange() {
    // let changed = false
    // if(this.oldTitle !== this.editDesignForm.get('title').value) {
    //   changed = changed || true;
    //   console.log("title changed", this.oldTitle, this.editDesignForm.get('title').value);
    // }
    // if (this.oldDescription !== this.editDesignForm.get('description').value) {
    //   changed = changed || true;
    // }
    // if (this.oldType !== this.editDesignForm.get('type').value) {
    //   changed = changed || true;
    // }
    // console.log('tags: ', this.tags)
    // console.log('oldTags: ', this.oldTags)
    // if (this.oldTags.length != this.tags.length) {
    //   changed = changed || true;
    // } else {
    //   // let newtags = this.tags.filter(tag => !this.oldTags.includes(tag));
    //   let newtags = this.tags.filter(tag => {
    //     if (this.oldTags.includes(tag)) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   });
    //   console.log('New Tages: ', newtags)
    //   if (newtags.length > 0) {
    //     changed = changed || true;
    //   }
    // }
    // this.isChanged = changed;


    // // -----  
    // if(this.oldTitle !== this.editDesignForm.get('title').value) {
    //   //this.isChanged = true;
    //   changed = changed || true;
    //   console.log("title changed", this.oldTitle, this.editDesignForm.get('title').value);
    // }
    // else {
    //   //this.isChanged = false;
    //   if(this.oldType !== this.editDesignForm.get('type').value || this.oldDescription !== this.editDesignForm.get('description').value) {
    //     this.isChanged = true;
    //   }else {
    //     this.isChanged = false;
    //   }
    //   console.log("title reverted");
    // }

    // if(this.oldType !== this.editDesignForm.get('type').value) {
    //   this.isChanged = true;
    //   console.log("type changed", this.oldType, this.editDesignForm.get('type').value);
    // } else {
    //   // this.isChanged = false;
    //   if(this.oldTitle !== this.editDesignForm.get('title').value || this.oldDescription !== this.editDesignForm.get('description').value) {
    //     this.isChanged = true;
    //   }else {
    //     this.isChanged = false;
    //   }
    //   console.log("type reverted");
    // } 
    
    // if(this.oldDescription !== this.editDesignForm.get('description').value) {
    //   this.isChanged = true;
    //   console.log("description changed");
    // } else {
    //   //this.isChanged = false;
    //   if(this.oldType !== this.editDesignForm.get('type').value || this.oldTitle!== this.editDesignForm.get('title').value) {
    //     this.isChanged = true;
    //   }else {
    //     this.isChanged = false;
    //   }
    //   console.log("description reverted");
    // }
  }

  public checkForFileChange() {
    console.log("files changed");
    console.log(this.editDesignForm.get('files').value);
    // console.log(this.oldFile);
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
    let flag=false;
    // console.log(event);
    // console.log(input, value);

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.forEach(tag => {
        if(tag == value) {
          flag = true;
        }
      });

      if(flag===false) {
        // this.isTagChanged = true;
        // console.log('new tag added');
        this.tags.push(value.trim());
      }else{
        // this.isTagChanged = false;
        // console.log('tag exists');
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.checkForChange()
  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      // this.isTagChanged = false;
      // console.log('tag removed');
    }
    this.checkForChange();
  }

  changeState() {
    this.editDesignForm.reset();
    this.tags = [];
    this.files = new Set();
    this.fileAttached = false;
    this.isSuccessful = null;
  }

  showSuccessMessage(msg: string) {
    this.toastr.success(msg, "Success");
  }

  showFailedMessage(msg: string) {
    this.toastr.error(msg, "Error");
  }


  onCancel() {
    console.log('On Cancel');
    this.router.navigate(['/design/details']);
  }

  setIsFileAttached(fileAttached) {
    this.fileAttached = fileAttached;
  }

}
