import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SigninService } from './signin.service';
import { AuthorizationService } from '@modules/core/services/authorization.service';
import {Observable, Subscription} from 'rxjs';
import { isNil} from 'lodash';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  public signinSubscriber$: Subscription
  public authorizeSubscriber$: Subscription;
  constructor(private router: Router, 
    private http: HttpClient, 
    private signinService: SigninService) { }

  ngOnInit(): void {
  }

  public signup() {
    this.router.navigate(['/signup']);
  }

  public forgotPassword() {
    this.router.navigate(['/password']);
  }

  onSignin(form: NgForm) {

    // console.log(form);
    const email = form.value.userEmail;
    const pass = form.value.userPass;


    if (email.length > 0 && pass.length > 0){
      // console.log(email);
      console.log(email);
      this.signinSubscriber$ = this.signinService.signin(email, pass).subscribe( (observer: any) => {
        if (observer) {
          this.authorizeSubscriber$ = this.signinService.getAuthorizedRoutes().subscribe((observer1: any) => {
            this.signinService.setNavigations(observer1);
            this.router.navigate(['/dashboard']);
          }, (error: any) => {
            console.log('Authorization subscription error: ', error);
          });
        } else {
          console.log('User not Found');
          //this.router.navigate(['/login']);
          // window.location.href = 'http://localhost:4200/login';
        }
      }, (error: any) => {
        console.log('Sign subscription error: ', error);
      });
    }

  }

  /**
   * Unsubscribe existing subscriptions
   * */
  ngOnDestroy(): void {
    console.log('on destroy')
    if (!isNil(this.signinSubscriber$)) {
      this.signinSubscriber$.unsubscribe();
    }
    if(!isNil(this.authorizeSubscriber$)) {
      this.authorizeSubscriber$.unsubscribe();
    }
  }

}
