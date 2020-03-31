import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  }


  public signup() {
    this.router.navigate(['/registration']);
  }

  onSignin(form: NgForm) {
    
    // console.log(form);
    let email = form.value.userEmail;
    let pass = form.value.userPass;
    

    if(email.length > 0 && pass.length > 0){
      // console.log(email);
      console.log(email);
      const result = this.authService.checkUserLogin(email, pass);
      
      // this.router.navigate(['/']);
    }

  }

}
