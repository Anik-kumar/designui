import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
// import { _ } from 'lodash';
import { ValidatePassword } from './validate-password';
import {ISelect} from '@core/interface/iSelect';
import {ISignup} from '@modules/registration/signup/isignup';
import {RegistrationService} from '@modules/registration/registration.service';
import { ValidateEmail } from './validate-email';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;
  signupForm1: FormGroup;
  submitted = false;
  emailFormControl: FormControl;
  btnColor = 'primary';
  disabled = true;
  maxDate = new Date();
  isSignupSuccess = false;
  isEmailExists = false;


  genders: ISelect[] = [{
    viewValue: 'Male',
    value: 'male'
  }, {
    viewValue: 'Female',
    value: 'female'
  }, {
    viewValue: 'Don\'t want to answer',
    value: 'NA'
  }]

  constructor(private router: Router, private formBuilder: FormBuilder, private registrationService: RegistrationService) {

    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 8, 11, 31);
  }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      passwordValidation: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      }, {
        validator: [ValidatePassword.MatchPassword, ValidatePassword.validateDuplicate, this.checkEmail]// custom validation,
      }),
      gender: ['', [Validators.required]],
      dob: ['', Validators.required]
    });


  }

  public signin() {
    this.router.navigate(['/signin']);
  }


  onSubmit() {
    console.log('Status: ', this.signupForm.status, this.signupForm.invalid)
    // console.log('signupForm', this.signupForm);
    if (!this.signupForm.invalid) {
      let regForm: ISignup = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        pass: this.signupForm.value.passwordValidation.password,
        phone: this.signupForm.value.phone,
        dob: this.signupForm.value.dob,
        gender: this.signupForm.value.gender
      };
      // console.log(regForm);
      this.registrationService.signup(regForm).subscribe((res) => {
        console.log('Signup done: ', res);

        if(res._id){
          console.log(res._id);
          this.isSignupSuccess = true;
        }else {
          this.isSignupSuccess = false;
        }
      });
    }
    
  }

  checkEmail(userMail) {
    console.log("Event => ",userMail);

    this.registrationService.checkDuplicateEmail(userMail).subscribe(data => {
      if(data.error.length < 1) {
        if(data.found) {
          this.isEmailExists = true;
        }else {
          this.isEmailExists = false;
        }
      } else {
        console.log(data.error);
      }
    });

  }

}
