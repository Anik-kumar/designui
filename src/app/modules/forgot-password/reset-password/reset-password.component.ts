import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, UrlTree } from "@angular/router";
import { isNil } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from "@core/services/auth.service";
import { ForgotPasswordService } from '../forgot-password.service';
import { ValidatePassword } from './validate-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public hasEmail = false;
  private email = null;
  resetPassForm: FormGroup;

  constructor(private router: Router,
    private fpService: ForgotPasswordService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { 
      this.email = this.router.parseUrl(this.router.url).queryParams['email'];
      console.log(this.email);
    }

  ngOnInit(): void {
    if(this.email){
      this.hasEmail = true;
    }

    this.resetPassForm = this.formBuilder.group({
      email: [this.email, [Validators.email]],
      passwordValidation: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      }, {
        validator: [ValidatePassword.MatchPassword]// custom validation,
      })
    });
  }

  onSubmit() {


    return;
  }

  public signup() {
    this.router.navigate(['/signup']);
  }


}
