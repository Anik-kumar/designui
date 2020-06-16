import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IamRoutingModule } from './iam-routing.module';
import { IamComponent } from './iam.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageUserAccessComponent } from './manage-user-access/manage-user-access.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [IamComponent, ManageUserComponent, ManageUserAccessComponent],
  imports: [
    CommonModule,
    IamRoutingModule,
    SharedModule
  ]
})
export class IamModule { }
