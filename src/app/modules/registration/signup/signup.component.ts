import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

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
  submitted = false;
  

  constructor(private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

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

    this.signupForm = new FormGroup({
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
}
