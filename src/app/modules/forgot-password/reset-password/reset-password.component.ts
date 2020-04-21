import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, UrlTree } from "@angular/router";
import { isNil } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from "@core/services/auth.service";
import { ForgotPasswordService } from '../forgot-password.service';
import { ValidatePassword } from './validate-password';
import { from } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public hasEmail = false;
  private email = null;
  resetPassForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router,
    private fpService: ForgotPasswordService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { 
      // this.email = this.router.parseUrl(this.router.url).queryParams['email'];
      this.email = fpService.getUserEmail();
      console.log(this.email);
    }

  ngOnInit(): void {
    this.resetPassForm = this.formBuilder.group({
      email: [this.email],
      passwordValidation: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {
        validator: [ValidatePassword.MatchPassword]// custom validation,
      })
    });

    if(this.email){
      this.hasEmail = true;
    }

  }

  onSubmit() {
    console.log('Status: ', this.resetPassForm.status, this.resetPassForm.invalid);
    // console.log('forgotPassForm -> ', this.forgotPassForm.value.email);
    try{
      if (!this.resetPassForm.invalid) {
        let password = this.resetPassForm.value.passwordValidation.password;
        console.log('resetPassForm -> ', this.email, password);
  
        this.fpService.resetPassword(this.email, password).subscribe((res) => {
          console.log('Reset Password Success: ', res);
  
          if(res.success && res.error==null){
            console.log(res.message);
            this.isSubmitted = true;
            this.successNotification();
          }else {
            this.isSubmitted = false;
            this.errorNotification();
          }
        });
      }

    }catch(error) {
      console.log("Exception Error in ResetPasswordComponent onSubmit() => ", error);
    }
    
  }

  public signup() {
    this.router.navigate(['/signup']);
  }

  public signin() {
    this.router.navigate(['/signin']);
  }

  public changeState() {
    this.hasEmail = false;
    this.router.navigate(['/password']);
  }

  public successNotification() {
    this.toastrService.success("Password reset is successful", "Success");
  }

  public errorNotification() {
    this.toastrService.error("Password reset is unsuccessful", "Error");
  }


}
