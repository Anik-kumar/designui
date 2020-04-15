import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { isNil } from 'lodash';

@Component({
  selector: 'app-new-design',
  templateUrl: './new-design.component.html',
  styleUrls: ['./new-design.component.scss']
})
export class NewDesignComponent implements OnInit {

  newDesignForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { 
    this.newDesignForm = this.formBuilder.group({
      designImage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Status: ', this.newDesignForm.status, this.newDesignForm.invalid);
    console.log(this.newDesignForm);
  }

}
