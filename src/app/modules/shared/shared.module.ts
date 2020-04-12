import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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



@NgModule({
  declarations: [
    DpTopNavComponent, 
    DpTopNavSearchComponent, 
    DpTopNavDocumentsComponent, 
    DpTopNavNotificationComponent, 
    DpTopNavNotificationItemComponent, 
    DpTopNavMessageComponent, 
    DpTopNavMessageItemComponent, 
    DpTopNavUserComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    IconsModule
  ],
  exports: [
    DpTopNavComponent, 
    DpTopNavSearchComponent, 
    DpTopNavDocumentsComponent, 
    DpTopNavNotificationComponent, 
    DpTopNavNotificationItemComponent, 
    DpTopNavMessageComponent, 
    DpTopNavMessageItemComponent, 
    DpTopNavUserComponent
  ]
})
export class SharedModule { }
