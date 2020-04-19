import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { isNil } from 'lodash';
import { ForgotPasswordService } from './forgot-password.service';
//import { ToastrService } from ‘ngx-toastr’;
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassForm: FormGroup;
  isSubmitted = false;
  showForm = true;
  private token;

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private fpService: ForgotPasswordService,
    private toastr: ToastrService) { 
      // this.token = this.router.parseUrl(this.router.url).queryParams['token'];
      // console.log(this.token);
    }

  ngOnInit(): void {
    this.forgotPassForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });

    // if(this.token){
    //   this.verifyToken(this.token);
    // }
    // this.tokenExpired();
  }

  onSubmit(){
    console.log('Status: ', this.forgotPassForm.status, this.forgotPassForm.invalid)
    // console.log('forgotPassForm -> ', this.forgotPassForm.value.email);
    if (!this.forgotPassForm.invalid) {
      let email = this.forgotPassForm.value.email;
      console.log('forgotPassForm -> ', email);
      this.fpService.sendVerification(email).subscribe((res) => {
        console.log('Verification Email is sent: ', res);

        if(res._id){
          console.log(res._id);
          this.isSubmitted = true;
        }else {
          this.isSubmitted = false;
        }
      });
    }

  }

  public signup() {
    this.router.navigate(['/signup']);
  }

  // public tokenExpired() {
  //   if(!this.showForm) {
  //     this.toastr.error("Your reset password token session is expired", "Token Expired");
  //   }
  // }

  // public changeState() {
  //   this.showForm = !this.showForm;
  // }

  // verifyToken(token) {

  //   if(token.length > 50 && token[0] == 'e'){
  //     console.log("Data => ", token);
      
  //     const result = this.fpService.verifyForgotPassToken(token).subscribe(observer => {
  //       console.log('Result : ', observer);
        
        
  //       if(observer.success) {
  //         console.log("VerifyEmail>>  Result => ", observer.message);
  //         this.showForm = true;

  //       } else {
  //         console.log("VerifyEmail>>  Result => ", observer.error);
  //         this.showForm = false;
  //       }
  //     });
      
      
  //   }
    
    
  // }


}
