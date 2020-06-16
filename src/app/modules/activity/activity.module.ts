import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import {SharedModule} from '@shared/shared.module';
import {ActivityService} from '@modules/activity/activity.service';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [ActivityComponent, MyActivitiesComponent, AllActivitiesComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule,
    MatTableModule,
    MatProgressBarModule
  ],
  providers: [
    ActivityService
  ]
})
export class ActivityModule { }
