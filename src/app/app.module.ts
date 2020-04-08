import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    CoreModule,
    PublicModule,
    RegistrationModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
