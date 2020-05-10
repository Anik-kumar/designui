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
  isTagChanged = false;
  tags = [];
  oldTitle = "";
  oldType = "";
  oldDescription = "";
  oldFile = "";
  oldTags = []
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
    this.oldTags = cloneDeep(this.userDesignObj.tags);

    
    this.oldTitle = this.userDesignObj.title;
    this.oldType = this.userDesignObj.type;
    this.oldDescription = this.userDesignObj.description;
    this.oldFile = this.userDesignObj.raw_design.public_url;
    
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
    console.log('--- On Submit: ', event);
    //console.log(this.editDesignForm);

    const formData: FormData = new FormData();
    formData.append('file', editForm.get('file').value, editForm.get('file').value.name);
    formData.append('title', editForm.get('title').value);
    formData.append('type', editForm.get('type').value);
    formData.append('tags', editForm.get('tags').value);
    formData.append('description', editForm.get('description').value);
    let uri_title = editForm.get('title').value.trim().replace(/ /g, "-").toLowerCase();

    this.designService.createNewDessign(formData).subscribe(observer => {
      console.log('Response: ', observer);

      if(observer.key.includes('design/') && !isNil(observer.Key) && !isNil(observer.Location)) {
        this.isSuccessful = true;
        this.showSuccessMessage();
        this.editDesignForm.reset();

        this.router.navigate(['/design/details/'+uri_title]);
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
    let changed = false
    if(this.oldTitle !== this.editDesignForm.get('title').value) {
      changed = changed || true;
      console.log("title changed", this.oldTitle, this.editDesignForm.get('title').value);
    }
    if (this.oldDescription !== this.editDesignForm.get('description').value) {
      changed = changed || true;
    }
    if (this.oldType !== this.editDesignForm.get('type').value) {
      changed = changed || true;
    }
    console.log('tags: ', this.tags)
    console.log('oldTags: ', this.oldTags)
    if (this.oldTags.length != this.tags.length) {
      changed = changed || true;
    } else {
      // let newtags = this.tags.filter(tag => !this.oldTags.includes(tag));
      let newtags = this.tags.filter(tag => {
        if (this.oldTags.includes(tag)) {
          return false;
        } else {
          return true;
        }
      });
      console.log('New Tages: ', newtags)
      if (newtags.length > 0) {
        changed = changed || true;
      }
    }
    this.isChanged = changed;


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

  public check() {

  }

  // public checkForTitleChange() {
  //   if(this.oldTitle !== this.editDesignForm.get('title').value) {
  //     this.isChanged = true;
  //     console.log("title changed", this.oldTitle, this.editDesignForm.get('title').value);
  //   } 
  //   else {
  //     //this.isChanged = false;
  //     console.log("title reverted");
  //   }
  // }

  // public checkForTypeChange() {
    
  //   if(this.oldType !== this.editDesignForm.get('type').value) {
  //     this.isChanged = true;
  //     console.log("type changed", this.oldType, this.editDesignForm.get('type').value);
  //   } else {
  //     this.isChanged = false;
  //     console.log("type reverted");
  //   }
  // }

  // public checkForDescripChange() {
  //   if(this.oldDescription !== this.editDesignForm.get('description').value) {
  //     this.isChanged = true;
  //     console.log("description changed");
  //   } else {
  //     //this.isChanged = false;
  //     console.log("description reverted");
  //   }
  // }

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
        this.isTagChanged = true;
        console.log('new tag added');
        this.tags.push(value.trim());
      }else{
        this.isTagChanged = false;
        console.log('tag exists');
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
      this.isTagChanged = false;
      console.log('tag removed');
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

  showSuccessMessage() {
    this.toastr.success("Design is Added", "Success");
  }

  showFailedMessage() {
    this.toastr.error("Design failed to Add", "Error");
  }


  onCancel() {
    console.log('On Cancel');
    // this.router.navigate(['/design/details']);
  }

}
