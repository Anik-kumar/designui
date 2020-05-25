import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from '@modules/icons/icons.module';



import { DpTopNavComponent } from './ui/dp-top-nav/dp-top-nav.component';
import { DpTopNavSearchComponent } from './ui/dp-top-nav-search/dp-top-nav-search.component';
import { DpTopNavDocumentsComponent } from './ui/dp-top-nav-documents/dp-top-nav-documents.component';
import { DpTopNavNotificationComponent } from './ui/dp-top-nav-notification/dp-top-nav-notification.component';
import { DpTopNavNotificationItemComponent } from './ui/dp-top-nav-notification-item/dp-top-nav-notification-item.component';
import { DpTopNavMessageComponent } from './ui/dp-top-nav-message/dp-top-nav-message.component';
import { DpTopNavMessageItemComponent } from './ui/dp-top-nav-message-item/dp-top-nav-message-item.component';
import { DpTopNavUserComponent } from './ui/dp-top-nav-user/dp-top-nav-user.component';
import { DpSideNavComponent } from './ui/dp-side-nav/dp-side-nav.component';
import { DpSideNavItemComponent } from './ui/dp-side-nav-item/dp-side-nav-item.component';
import { NewDesignComponent } from './ui/new-design/new-design.component';
import { FileUploaderComponent } from './ui/file-uploader/file-uploader.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    DpTopNavComponent, 
    DpTopNavSearchComponent, 
    DpTopNavDocumentsComponent, 
    DpTopNavNotificationComponent, 
    DpTopNavNotificationItemComponent, 
    DpTopNavMessageComponent, 
    DpTopNavMessageItemComponent, 
    DpTopNavUserComponent, 
    DpSideNavComponent, 
    DpSideNavItemComponent, 
    NewDesignComponent, 
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    IconsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    DpTopNavComponent, 
    DpTopNavSearchComponent, 
    DpTopNavDocumentsComponent, 
    DpTopNavNotificationComponent, 
    DpTopNavNotificationItemComponent, 
    DpTopNavMessageComponent, 
    DpTopNavMessageItemComponent, 
    DpTopNavUserComponent,
    DpSideNavComponent, 
    DpSideNavItemComponent,
    NewDesignComponent,
    FileUploaderComponent
  ]
})
export class SharedModule { }
