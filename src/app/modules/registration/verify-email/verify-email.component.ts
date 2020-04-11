import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { RegistrationService } from "../registration.service";
import { AuthService } from "../../core/services/auth.service";


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  private token;
  public verifyFlag : boolean;

  constructor( private router: Router, 
    private registrationService: RegistrationService, 
    private authService: AuthService ) {
    // console.log( "Const => ", this.router.url);
    // console.log("Const => ", this.router);
    // console.log(this.router.parseUrl(this.router.url).queryParams['token']);
    this.token = this.router.parseUrl(this.router.url).queryParams['token'];
  }

  
  ngOnInit(): void {
    
    if(this.token){
      this.verifyEmail(this.token);
    }
    

  }


  verifyEmail(token) {
    let isFound = false;
    let message = '';
    let errors = '';

    if(token.length > 50 && token[0] == 'e'){
      console.log("Data => ", token);

      const result = this.registrationService.verifyUserMail(token).subscribe(observer => {
        console.log('Result : ', observer);
        isFound = observer.success;
        message = observer.message;
        errors = observer.error;
      });

      if(isFound) {
        console.log("VerifyEmail>>  Result => ", message);
        this.verifyFlag = true;
      } else {
        console.log("VerifyEmail>>  Result => ", errors);
        this.verifyFlag = false;
      }
      
    }
    
    
  }

}
