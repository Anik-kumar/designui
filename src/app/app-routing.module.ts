import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from '@app/auth-guard.service';
import {IamGuardService} from '@app/iam-guard.service';



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
  { path: 'profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule), canActivate: [AuthGuardService] },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService] },
  { path: 'activity', loadChildren: () => import('./modules/activity/activity.module').then(m => m.ActivityModule), canActivate: [AuthGuardService] },
  { path: 'iam', loadChildren: () => import('./modules/iam/iam.module').then(m => m.IamModule), canActivate: [AuthGuardService, IamGuardService] },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
