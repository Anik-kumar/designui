import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DpTopNavComponent } from './ui/dp-top-nav/dp-top-nav.component';
import { DpTopNavSearchComponent } from './ui/dp-top-nav-search/dp-top-nav-search.component';
import { DpTopNavDocumentsComponent } from './ui/dp-top-nav-documents/dp-top-nav-documents.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from '@modules/icons/icons.module';



@NgModule({
  declarations: [DpTopNavComponent, DpTopNavSearchComponent, DpTopNavDocumentsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    IconsModule
  ],
  exports: [
    DpTopNavComponent,
    DpTopNavSearchComponent
  ]
})
export class SharedModule { }
