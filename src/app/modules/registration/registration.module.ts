import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';

import { RegistrationRoutingModule } from './registration-routing.module';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule
  ]
})
export class RegistrationModule { }
