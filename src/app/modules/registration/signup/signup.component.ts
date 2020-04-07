import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidatePassword } from './validate-password';
import {ISelect} from '@core/interface/iSelect';
import {ISignup} from '@modules/registration/signup/isignup';
import {RegistrationService} from '@modules/registration/registration.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
  //   'November', 'December'];
  // // @ts-ignore
  // days = Array(31).fill().map((x, i) => i);
  // // @ts-ignore
  // years = Array(100).fill().map((x, i) => i);
  // years2 = 2018;
  password: string;
  confirmPass: string;
  flag: boolean = false;
  signupForm: FormGroup;
  signupForm1: FormGroup;
  submitted = false;
  emailFormControl: FormControl;
  btnColor = 'primary';
  disabled = true;
  maxDate = new Date();


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
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      passwordValidation: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      }, {
        validator: ValidatePassword.MatchPassword // custom validation
      }),
      gender: [''],
      dob: ['', Validators.required]
    });
    // this.signupForm = this.formBuilder.group({
    //   firstName: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    //   lastName: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(4)]],
    //   repeatPassword: ['', Validators.required, Validators.minLength(4)],
    //   phone: ['', Validators.required, ],
    //   gender: ['', Validators.required],
    //   dob: ['', Validators.required]
    //   // acceptTerms: [false, Validators.requiredTrue]
    // }, {
    //   validator: this.mustMatch('password', 'confirmPassword')
    // });

    this.signupForm1 = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required])
      // acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    });

  }

  get f() {
    return this.signupForm.controls;
  }



  public errorHandling = (control: string, error: string) => {
    return this.signupForm.controls[control].hasError(error);
  }

  public signin() {
    this.router.navigate(['/signin']);
  }

  submitForm() {
    this.submitted = true;

    if(this.signupForm.invalid) {
      return;
    }

    console.log(this.signupForm.value);
  }

  checkPass(event) {

    console.log(event);
    console.log(event.target.value);
    this.confirmPass = event.target.value;
    if(this.password != this.confirmPass){
      console.log('Password did not match');
      this.flag = false;
    }else {
      console.log('Password match');
      this.flag = true;
    }
  }

  storePass(event) {
    this.password = event.target.value;
    console.log(this.password);
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }

  }

  onSubmit() {
    console.log('Status: ', this.signupForm.status, this.signupForm.invalid)
    console.log('signupForm', this.signupForm);

    let regForm: ISignup = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      pass: this.signupForm.value.password,
      phone: this.signupForm.value.phone,
      dob: this.signupForm.value.dob,
      gender: this.signupForm.value.gender
    };
    console.log(regForm);
    this.registrationService.signup(regForm).subscribe((res) => {
      console.log('Signup done: ', res);
    });
  }
}
