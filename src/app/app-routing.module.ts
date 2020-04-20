import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// const routes: Routes = [];
const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'signin', loadChildren: () => import('./modules/signin/signin.module').then(m => m.SigninModule) },
  { path: 'signup', loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule) },
  { path: 'verify-email', loadChildren: () => import('./modules/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'new-design', loadChildren: () => import('./modules/newdesign/newdesign.module').then(m => m.NewdesignModule) },
  { path: 'password', loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
