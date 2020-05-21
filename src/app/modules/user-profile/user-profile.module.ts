import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatNativeDateModule } from '@angular/material/core';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '@modules/shared/shared.module';

import { UserProfileComponent } from './user-profile.component';
import { GeneralComponent } from './general/general.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { DesignsComponent } from './designs/designs.component';


@NgModule({
  declarations: [UserProfileComponent, GeneralComponent, ChangePasswordComponent, AdvancedComponent, DesignsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileRoutingModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UserProfileModule { }
