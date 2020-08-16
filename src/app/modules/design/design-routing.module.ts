import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignComponent } from './design.component';
import { ListsComponent } from './lists/lists.component';
import { NewComponent } from './new/new.component';
// import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: '', component: DesignComponent },
  { path: 'new', component: NewComponent },
  // { path: 'show/:title', component: ShowComponent },
  { path: 'details/:title', component: DetailsComponent },
  { path: 'details/:title/:id', component: DetailsComponent },
  { path: 'list', component: ListsComponent },
  { path: 'edit/:title', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
