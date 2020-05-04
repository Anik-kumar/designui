import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';

import { StorageServiceModule } from 'angular-webstorage-service';

import { httpInterceptorProviders } from './interceptors/http-interceptor-providers';
// import { AuthService } from './guard/auth.service';
// @ts-ignore
import { CoreModule } from '@core/core.module';
import { AuthService } from '@core/services/auth.service';
import { AuthorizationService } from '@core/services/authorization.service';
import { CronService } from '@core/services/cron.service';
// @ts-ignore
import { PublicModule } from '@modules/public/public.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconsModule } from '@modules/icons/icons.module';
import { SharedModule } from '@modules/shared/shared.module';

import { environment } from '../environments/environment';
import { AppLoadService} from './app-load.service';

export function init_app(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}
   
export function get_settings(appLoadService: AppLoadService) {
  return () => appLoadService.getSettings();
}

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
    IconsModule
  ],
  providers: [
    httpInterceptorProviders,
    CronService,
    AuthService,
    AuthorizationService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
