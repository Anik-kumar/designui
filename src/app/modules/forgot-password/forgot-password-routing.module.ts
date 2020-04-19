import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ShowMessageComponent } from './show-message/show-message.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyPasswordComponent } from './verify-password/verify-password.component';

const routes: Routes = [
  { path: '', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'verify', component: VerifyPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
