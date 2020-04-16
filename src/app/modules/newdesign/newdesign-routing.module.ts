import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewdesignComponent } from './newdesign.component';

const routes: Routes = [{ path: '', component: NewdesignComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewdesignRoutingModule { }
