import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from '@app/auth-guard.service';



// const routes: Routes = [];
const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) },
  // { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuardService] },
  { path: 'signin', loadChildren: () => import('./modules/signin/signin.module').then(m => m.SigninModule) },
  { path: 'signup', loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule) },
  { path: 'verify-email', loadChildren: () => import('./modules/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'design', loadChildren: () => import('@modules/design/design.module').then(m => m.DesignModule), canActivate: [AuthGuardService] },
  // { path: 'design', loadChildren: () => import('@modules/design/design.module').then(m => m.DesignModule) },
  { path: 'password', loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)},
  { path: 'profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
