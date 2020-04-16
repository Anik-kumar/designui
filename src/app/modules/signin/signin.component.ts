import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private signinService: SigninService) { }

  ngOnInit(): void {
  }

  public signup() {
    this.router.navigate(['/signup']);
  }

  onSignin(form: NgForm) {

    // console.log(form);
    const email = form.value.userEmail;
    const pass = form.value.userPass;


    if (email.length > 0 && pass.length > 0){
      // console.log(email);
      console.log(email);
      const result = this.signinService.signin(email, pass).subscribe( (observer: any) => {
        if (observer) {
          console.log('User Found ', observer);

          this.router.navigate(['/dashboard']);
        } else {
          console.log('User not Found');
          //this.router.navigate(['/login']);
          // window.location.href = 'http://localhost:4200/login';
        }
      });
      // this.router.navigate(['/']);
    }

  }

}
