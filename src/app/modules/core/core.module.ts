import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '@core/services/user-api.service';
import { AuthService } from '@core/services/auth.service';
import {LocalStorageService} from '@core/services/local-storage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    UserApiService,
    LocalStorageService
  ]
})
export class CoreModule { }
