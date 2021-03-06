import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@modules/shared/shared.module';
import { IconsModule } from '@modules/icons/icons.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReviewDesignComponent } from './review-design/review-design.component';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ApprovedComponent } from './approved/approved.component';
import { RejectedComponent } from './rejected/rejected.component';
import { ReviewingComponent } from './reviewing/reviewing.component';
import { AllSubmittedComponent } from './all-submitted/all-submitted.component';
import { AllApprovedComponent } from './all-approved/all-approved.component';
import { AllRejectedComponent } from './all-rejected/all-rejected.component';
import { AllReviewingComponent } from './all-reviewing/all-reviewing.component';
import { DesignInfoComponent } from './design-info/design-info.component';
import { ConfirmRejectComponent } from './confirm-reject-dialog/confirm-reject-dialog.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { VerifiedUserComponent } from './verified-user/verified-user.component';
import { NotVerifiedUserComponent } from './not-verified-user/not-verified-user.component';



@NgModule({
  declarations: [AdminComponent, ReviewDesignComponent, ReviewDialogComponent, ApprovedComponent, RejectedComponent, ReviewingComponent, AllSubmittedComponent, AllApprovedComponent, AllRejectedComponent, AllReviewingComponent, DesignInfoComponent, ConfirmRejectComponent, AllUsersComponent, VerifiedUserComponent, NotVerifiedUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    IconsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
