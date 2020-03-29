import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { httpInterceptorProviders } from './interceptors/http-interceptor-providers';
import { AuthService } from './guard/auth.service';
// @ts-ignore
import { CoreModule } from '@core/core.module';
// @ts-ignore
import { PublicModule } from '@modules/public/public.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    PublicModule,
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
