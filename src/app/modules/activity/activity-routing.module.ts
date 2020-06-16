import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityComponent } from './activity.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { AllActivitiesComponent } from './all-activities/all-activities.component';

const routes: Routes = [
  { path: '', component: ActivityComponent },
  { path: 'mine', component: MyActivitiesComponent },
  { path: 'all', component: AllActivitiesComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
