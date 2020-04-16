import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';

import { StorageServiceModule } from 'angular-webstorage-service';


import { httpInterceptorProviders } from './interceptors/http-interceptor-providers';
import { AuthService } from './guard/auth.service';
// @ts-ignore
import { CoreModule } from '@core/core.module';
// @ts-ignore
import { PublicModule } from '@modules/public/public.module';

import { RegistrationModule } from '@modules/registration/registration.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { IconsModule } from '@modules/icons/icons.module';
import { SharedModule } from '@modules/shared/shared.module';
//import { NewdesignModule } from '@modules/newdesign/newdesign.module';



@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    CoreModule,
    PublicModule,
    // RegistrationModule,
    IconsModule
    // SharedModule
    //NewdesignModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
