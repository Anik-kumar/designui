import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GeneralComponent } from './general/general.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { DesignsComponent } from './designs/designs.component';
import { UserProfileService } from './user-profile.service';

const routes: Routes = [
  { path: '', component: UserProfileComponent , children: [
    { path: 'advance', component: AdvancedComponent },
    { path: 'basic', component: GeneralComponent },
    { path: 'password', component: ChangePasswordComponent },
  ]}
  // { path: 'general/password', component: ChangePasswordComponent, outlet: "profile" },
  // { path: 'general/basic', component: GeneralComponent, outlet: "profile" },
  // { path: 'general/advance', component: AdvancedComponent, outlet: "profile" },
  // { path: 'general/designs', component: DesignsComponent, outlet: "profile" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [UserProfileService],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
