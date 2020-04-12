import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DpTopNavComponent } from './ui/dp-top-nav/dp-top-nav.component';
import { DpTopNavSearchComponent } from './ui/dp-top-nav-search/dp-top-nav-search.component';



@NgModule({
  declarations: [DpTopNavComponent, DpTopNavSearchComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DpTopNavComponent,
    DpTopNavSearchComponent
  ]
})
export class SharedModule { }
