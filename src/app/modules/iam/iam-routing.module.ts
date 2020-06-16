import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IamComponent } from './iam.component';
import {ManageUserComponent} from './manage-user/manage-user.component';
import {ManageUserAccessComponent} from './manage-user-access/manage-user-access.component';

const routes: Routes = [
  { path: '', component: IamComponent },
  { path: 'user', component: ManageUserComponent },
  { path: 'access', component: ManageUserAccessComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IamRoutingModule { }
