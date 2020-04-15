import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewDesignComponent } from './new-design/new-design.component';


const routes: Routes = [
  { path: 'newdesign', component: NewDesignComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewDesignRoutingModule { }
