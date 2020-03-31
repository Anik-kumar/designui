import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicHomeComponent } from './public-home/public-home.component';


@NgModule({
  declarations: [PublicHomeComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
