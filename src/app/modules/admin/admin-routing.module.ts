import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ReviewDesignComponent } from './review-design/review-design.component';
import { ApprovedComponent } from "./approved/approved.component";
import { RejectedComponent } from "./rejected/rejected.component";
import { ReviewingComponent } from "./reviewing/reviewing.component";

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'review', component: ReviewDesignComponent },
    { path: 'approved', component: ApprovedComponent },
    { path: 'rejected', component: RejectedComponent },
    { path: 'reviewing', component: ReviewingComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
