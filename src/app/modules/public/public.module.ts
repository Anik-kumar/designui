import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared/shared.module';

import { PublicRoutingModule } from './public-routing.module';
import { PublicHomeComponent } from './public-home/public-home.component';


@NgModule({
  declarations: [PublicHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
