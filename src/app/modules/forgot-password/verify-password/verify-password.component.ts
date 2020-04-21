import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { isNil } from 'lodash';
import { ForgotPasswordService } from '../forgot-password.service';
//import { ToastrService } from ‘ngx-toastr’;
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.scss']
})
export class VerifyPasswordComponent implements OnInit {

  showForm = false;
  private token;
  private email = null;

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private fpService: ForgotPasswordService,
    private toastr: ToastrService) { 
      this.token = this.router.parseUrl(this.router.url).queryParams['token'];
      console.log(this.token);
    }

  ngOnInit(): void {
    if(this.token){
      this.verifyToken(this.token);
    }
  }

  verifyToken(token) {

    if(token.length > 50 && token[0] == 'e'){
      console.log("Data => ", token);
      
      const result = this.fpService.verifyForgotPassToken(token).subscribe(observer => {
        console.log('Result : ', observer);

        /**
         * observer { message, error, success, email }
         */
        
        if(observer.success) {
          console.log("VerifyEmail>>  Result => ", observer.message);
          this.showForm = true;
          this.email = observer.email;
          this.resetPass();
        } else {
          console.log("VerifyEmail>>  Result => ", observer.error);
          this.showForm = false;
          this.tokenExpired();
        }
      });
      
    }
    
  }

  public tokenExpired() {
    if(!this.showForm) {
      this.toastr.error("Your reset password token session is expired", "Token Expired");
    }
  }

  public changeState() {
    this.showForm = !this.showForm;
    this.router.navigate(['/password']);
  }

  public signup() {
    this.router.navigate(['/signup']);
  }

  public resetPass() {
    this.fpService.setUserEmail(this.email);
    this.router.navigate(['/password/reset']);
  }

}
