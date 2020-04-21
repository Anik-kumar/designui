import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { isNil } from 'lodash';
import { ValidatePassword } from './validate-password';
import { ISelect } from '@core/interface/iSelect';
import { ISignup } from './isignup';
import { SignupService } from './signup.service';
import {Subscription} from 'rxjs';
// import { ValidateEmail } from './validate-email';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public signupSubscriber$: Subscription;
  public emailCheckSubscriber$: Subscription;
  signupForm: FormGroup;
  btnColor = 'primary';
  disabled = true;
  maxDate = new Date();
  isSignupSuccess = false;
  isEmailExists = false;
  userTypes: ISelect[] = [{
    viewValue: 'I\'m a Designer',
    value: 'DESIGNER',
  }, {
    viewValue: 'I\'m a Customer',
    value: 'CUSTOMER'
  }, {
    viewValue: 'I\'m a Reviewer',
    value: 'REVIEWER'
  }];
  genders: ISelect[] = [{
    viewValue: 'Male',
    value: 'male'
  }, {
    viewValue: 'Female',
    value: 'female'
  }, {
    viewValue: 'Don\'t want to answer',
    value: 'NA'
  }];

  constructor(private router: Router, private formBuilder: FormBuilder, private signupService: SignupService) {
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
        validator: [ValidatePassword.MatchPassword]// custom validation,
      }),
      gender: ['', [Validators.required]],
      dob: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  public signin() {
    this.router.navigate(['/signin']);
  }


  onSubmit() {
    console.log('Status: ', this.signupForm.status, this.signupForm.invalid);
    if (!this.signupForm.invalid) {
      let regForm: ISignup = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        pass: this.signupForm.value.passwordValidation.password,
        phone: this.signupForm.value.phone,
        dob: this.signupForm.value.dob,
        gender: this.signupForm.value.gender,
        userType: this.signupForm.value.userType
      };
      // console.log(regForm);
      this.signupSubscriber$ = this.signupService.signup(regForm).subscribe((res) => {
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
    this.emailCheckSubscriber$ = this.signupService.checkDuplicateEmail(userMail).subscribe(data => {
        if(data.found) {
          this.isEmailExists = true;
        }else {
          this.isEmailExists = false;
        }

    });

  }

  onClickEmail() {
    this.signupForm.get('email').setErrors(null);
  }

  onBlurEmail(email) {
    this.signupService.checkDuplicateEmail(email).subscribe(res =>{
      console.log(res);

      if (!isNil(res) && !isNil(res.found) && res.found == true) {
        this.isEmailExists = true;
        this.signupForm.get('email').setErrors({
          emailTaken: true
        });
      } else {
        this.isEmailExists = false;
      }
    });
  }

  validateDuplicate(abstractControl: AbstractControl) {
    return this.signupService.checkDuplicateEmail(abstractControl.value).subscribe(res => {
      if (!isNil(res) && !isNil(res.found) && res.found === true) {
        return { emailTaken: true };
      } else {
        return null;
      }
    });
  }

  ngOnDestroy(): void {
    this.signupSubscriber$.unsubscribe();
    this.emailCheckSubscriber$.unsubscribe();
  }

}
