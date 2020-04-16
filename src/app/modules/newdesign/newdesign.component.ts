import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ISelect} from '@core/interface/iSelect';

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

  constructor(private router: Router, private formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
    this.newDesignForm = this.formBuilder.group({
      type: ['', Validators.required],
      tag: ['', Validators.required],
      name: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  onSubmit() {

  }
}
