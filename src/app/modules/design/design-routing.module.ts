import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignComponent } from './design.component';
import { ListsComponent } from './lists/lists.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: '', component: DesignComponent },
  { path: 'new', component: NewComponent },
  { path: 'show/:title', component: ShowComponent },
  { path: 'list', component: ListsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
