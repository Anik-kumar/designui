import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignComponent } from './design.component';
import { ListsComponent } from './lists/lists.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  { path: '', component: DesignComponent },
  { path: 'new', component: NewComponent },
  { path: 'list', component: ListsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
