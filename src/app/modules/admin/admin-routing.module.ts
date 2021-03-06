import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ReviewDesignComponent } from './review-design/review-design.component';
import { ApprovedComponent } from "./approved/approved.component";
import { RejectedComponent } from "./rejected/rejected.component";
import { ReviewingComponent } from "./reviewing/reviewing.component";
import { AllApprovedComponent } from "./all-approved/all-approved.component";
import { AllRejectedComponent } from "./all-rejected/all-rejected.component";
import { AllReviewingComponent } from "./all-reviewing/all-reviewing.component";
import { AllSubmittedComponent } from "./all-submitted/all-submitted.component";
import { DesignInfoComponent } from "./design-info/design-info.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { VerifiedUserComponent } from "./verified-user/verified-user.component";
import { NotVerifiedUserComponent } from "./not-verified-user/not-verified-user.component";

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'submitted', component: ReviewDesignComponent },
    { path: 'approved', component: ApprovedComponent },
    { path: 'rejected', component: RejectedComponent },
    { path: 'reviewing', component: ReviewingComponent }, 
    { path: 'all/submitted', component: AllSubmittedComponent }, 
    { path: 'all/approved', component: AllApprovedComponent }, 
    { path: 'all/rejected', component: AllRejectedComponent }, 
    { path: 'all/reviewing', component: AllReviewingComponent },
    { path: 'design-info/:designId', component: DesignInfoComponent },
    { path: 'users/all', component: AllUsersComponent },
    { path: 'users/verified', component: VerifiedUserComponent },
    { path: 'users/not-verified', component: NotVerifiedUserComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
