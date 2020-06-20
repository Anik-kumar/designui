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

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'submitted', component: ReviewDesignComponent },
    { path: 'approved', component: ApprovedComponent },
    { path: 'rejected', component: RejectedComponent },
    { path: 'reviewing', component: ReviewingComponent }, 
    { path: 'all/submitted', component: AllSubmittedComponent }, 
    { path: 'all/approved', component: AllApprovedComponent }, 
    { path: 'all/rejected', component: AllRejectedComponent }, 
    { path: 'all/reviewing', component: AllReviewingComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
