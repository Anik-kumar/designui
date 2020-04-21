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
    console.log('Status: ', this.forgotPassForm.status, this.forgotPassForm.invalid);
    // console.log('forgotPassForm -> ', this.forgotPassForm.value.email);
    if (!this.forgotPassForm.invalid) {
      let email = this.forgotPassForm.value.email;
      console.log('forgotPassForm -> ', email);
      this.fpService.sendVerification(email).subscribe((resp) => {
        console.log('Verification Email is sent: ', resp);

        if(resp.success && resp.error==null){
          this.isSubmitted = true;
          this.showForm = false;
        }else {
          this.isSubmitted = false;
          this.showForm = true;
        }
        // console.log(resp.message);
      });
    }

  }

  public signup() {
    this.router.navigate(['/signup']);
  }

  public errorNotification() {
    
    this.toastr.error("Your reset password token session is expired", "Token Expired");
    
  }


}
