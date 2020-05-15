import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DesignFormInterface } from '@app/interface/design-form.interface';
import { isNil, cloneDeep } from 'lodash';

export interface Tags {
  tag: string;
}

@Component({
  selector: 'app-design-form',
  templateUrl: './design-form.component.html',
  styleUrls: ['./design-form.component.scss']
})
export class DesignFormComponent implements OnInit {
  
  isInEditMode = false;
  initialData: DesignFormInterface = {
    title: '',
    tags: [],
    type: '',
    description: '',
    file: null,
    publicUrl: ''
  }
  editDesignForm: FormGroup;
  isSuccessful: boolean;
  isChanged = false;
  isTagChanged = false;
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
  tags = new Array();
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  fileAttached = false;
  public files: Set<File> = new Set();
  @Output() submit = new EventEmitter();
  @Output() cancel = new EventEmitter();
  // @Output() isFileAttached = new EventEmitter();

  @Input()
  set formDefaultData(data: DesignFormInterface) {
    console.log('---- formDefaultData: ', data );
    if (!isNil(data)) {
      this.initialData = cloneDeep(data);
      // data.tags.forEach(tag => {
      //   this.tags.push(tag);
      // })
      this.tags = cloneDeep(data.tags);
      console.log('Initial Form Data: ', this.initialData);
    }
  }

  @Input()
  set editMode(mode: boolean) {
    this.isInEditMode = mode;
  }
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.tags = this.initialData.tags;
    if (isNil(this.initialData.tags)) {
      this.initialData.tags = [];
    }
    let itags = cloneDeep(this.initialData.tags);
    this.editDesignForm = this.formBuilder.group({
      // postTitle: [null, Validators.required],
      title: [this.initialData.title, Validators.required],
      type: [this.initialData.type, Validators.required],
      tags: [itags, Validators.required],
      file: [null],
      description: [this.initialData.description]
    });
    console.log('---- ngOnInit Design form : editDesignForm: ', this.editDesignForm );
  }

  public _isNil(data) {
    return isNil(data);
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
    console.log('File ',this.editDesignForm.get('file').value)
    //this.editDesignForm.get('file').markAsPristine({onlySelf: true});
    //this.editDesignForm.get('file').markAsTouched();
    this.editDesignForm.get('file').markAsDirty();
    this.checkForChange();
  }

  public checkForChange() {
    if (!this.isInEditMode) {
      return null;
    }
    console.log('initial data: ', this.initialData);
    let changed = false
    if(this.initialData.title !== this.editDesignForm.get('title').value) {
      changed = changed || true;
    }
    if (this.initialData.description !== this.editDesignForm.get('description').value) {
      changed = changed || true;
    }
    if (this.initialData.type !== this.editDesignForm.get('type').value) {
      changed = changed || true;
    }

    if (this.initialData.tags.length != this.tags.length) {
      changed = changed || true;
    } else {
      // let newtags = this.tags.filter(tag => !this.initialData.tags.includes(tag));
      console.log("initial ", this.initialData.tags);
      console.log("new ", this.tags);
      let newtags = this.tags.filter((tag: string) => {
        if (!isNil(this.initialData) && !isNil(this.initialData.tags) && this.initialData.tags.includes(tag)) {
          return false;
        } else {
          return true;
        }
      });
      console.log('New Tages: ', newtags);
      if (newtags.length > 0) {
        changed = changed || true;
      }
    }
    
    if(!isNil(this.editDesignForm.get('file').value)) {
      changed = changed || true;
    }
    this.isChanged = changed;
    console.log('isChanged: ', this.isChanged);
    console.log(this.editDesignForm);
  }

  public checkForFileChange() {
    //console.log("files changed");
    // console.log(this.editDesignForm.get('files').value);
  }

  public addFiles() {
    console.log('addFiles in parent');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let flag=false;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.forEach(tag => {
        if(tag == value) {
          flag = true;
        }
      });

      if(flag===false) {
        this.tags.push(value.trim());
        console.log('initial tag: ', this.initialData);
        console.log('Value: ', this.editDesignForm.get('tags').value);
        let formTags = this.editDesignForm.get('tags').value;
        formTags.push(value.trim());
        this.editDesignForm.get('tags').setValue(formTags);
        console.log('Tag added : ', this.editDesignForm.get('tags').value);
      }else{
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
      console.log('tag removed', this.editDesignForm.get('tags').value);
      let formTags = this.editDesignForm.get('tags').value;
      formTags.splice(index, 1);
      this.editDesignForm.get('tags').setValue(formTags)
    }
    console.log('tags: ', this.editDesignForm.get('tags').value);
    this.checkForChange();
  }

  public onSubmit() {
    console.log('----- On Submit ------', this.editDesignForm);
    this.submit.emit(this.editDesignForm);
  }

  public onCancel() {
    this.cancel.emit();
  }
}
