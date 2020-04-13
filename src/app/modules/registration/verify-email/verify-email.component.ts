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
  

    if(token.length > 50 && token[0] == 'e'){
      console.log("Data => ", token);
      
      const result = this.registrationService.verifyUserMail(token).subscribe(observer => {
        console.log('Result : ', observer);
        
        
        if(observer.success) {
          console.log("VerifyEmail>>  Result => ", observer.message);
          this.verifyFlag = true;
        } else {
          console.log("VerifyEmail>>  Result => ", observer.error);
          this.verifyFlag = false;
        }
      });
      
      
    }
    
    
  }

}
