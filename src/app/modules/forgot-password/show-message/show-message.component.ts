import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { AuthService } from "@core/services/auth.service";
import { ForgotPasswordService } from '../forgot-password.service';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
  
  private token;
  public verifyFlag : boolean;

  constructor(private router: Router,
    private fpService: ForgotPasswordService,
    private authService: AuthService) { 
      this.token = this.router.parseUrl(this.router.url).queryParams['token'];
      console.log(this.token);
    }

  ngOnInit(): void {
    if(this.token){
      this.verifyEmail(this.token);
    }
  }

  verifyEmail(token) {

    // if(token.length > 50 && token[0] == 'e'){
    //   console.log("Data => ", token);
      
    //   const result = this.fpService.verifyForgotPassToken(token).subscribe(observer => {
    //     console.log('Result : ', observer);
        
        
    //     if(observer.success) {
    //       console.log("VerifyEmail>>  Result => ", observer.message);
    //       this.verifyFlag = true;
    //     } else {
    //       console.log("VerifyEmail>>  Result => ", observer.error);
    //       this.verifyFlag = false;
    //     }
    //   });
      
      
    // }
    
    
  }

}
