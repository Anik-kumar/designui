import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DpTopNavComponent } from './ui/dp-top-nav/dp-top-nav.component';



@NgModule({
  declarations: [DpTopNavComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DpTopNavComponent
  ]
})
export class SharedModule { }
