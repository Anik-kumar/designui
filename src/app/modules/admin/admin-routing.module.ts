import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ReviewDesignComponent } from './review-design/review-design.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'review', component: ReviewDesignComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
