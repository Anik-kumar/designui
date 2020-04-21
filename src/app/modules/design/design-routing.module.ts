import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignComponent } from './design.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: '', component: DesignComponent },
  { path: 'list', component: ListsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
