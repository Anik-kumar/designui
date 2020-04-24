import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GeneralComponent } from './general/general.component';
import { UserProfileService } from './user-profile.service';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'password', component: ChangePasswordComponent },
  { path: 'general', component: GeneralComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [UserProfileService],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
