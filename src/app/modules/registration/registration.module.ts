import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationService } from '@modules/registration/registration.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

import { RegistrationRoutingModule } from './registration-routing.module';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
// import { MatCardModule } from '@angular/material/card';
// import { MatMenuModule } from '@angular/material/menu'; 
// import { MatToolbarModule } from '@angular/material/toolbar'; 
// import { MatSidenavModule } from '@angular/material/sidenav'; 
// import { MatIconModule } from '@angular/material/icon'; 
// import { MatListModule } from '@angular/material/list'; 
// import { MatNativeDateModule } from '@angular/material/core'; 
import { MatDatepickerModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatExpansionModule, MatAccordion } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatMenuModule } from '@angular/material'; 
import { MatToolbarModule } from '@angular/material'; 
import { MatSidenavModule } from '@angular/material'; 
import { MatIconModule } from '@angular/material'; 
import { MatListModule } from '@angular/material'; 
import { MatNativeDateModule } from '@angular/material'; 


@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule
  ],
  providers: [
    RegistrationService
  ]
})
export class RegistrationModule { }
