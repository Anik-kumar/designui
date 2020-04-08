import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
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
      phone: ['', [Validators.required]],
      passwordValidation: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      }, {
        validator: ValidatePassword.MatchPassword // custom validation
      }),
      gender: ['', [Validators.required]],
      dob: ['', Validators.required]
    });


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

  public signin() {
    this.router.navigate(['/signin']);
  }



  onSubmit() {
    console.log('Status: ', this.signupForm.status, this.signupForm.invalid)
    console.log('signupForm', this.signupForm);

    let regForm: ISignup = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      pass: this.signupForm.value.passwordValidation.password,
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
