import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// const routes: Routes = [];
const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: 'auth', loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'signin', loadChildren: () => import('./modules/signin/signin.module').then(m => m.SigninModule) },
  { path: 'signup', loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule) },
  { path: 'verify-email', loadChildren: () => import('./modules/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'new-design', loadChildren: () => import('./modules/newdesign/newdesign.module').then(m => m.NewdesignModule) }
//
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   { path: 'reg', component: RegistrationComponent },
//   { path: 'footer', component: FooterComponent },
//   { path: 'contact', component: ContactUsComponent },
//   { path: 'add/item', component: AddItemComponent },
//   { path: 'about', component: AboutUsComponent },
//   { path: 'checkout', component: CheckoutComponent },
//   { path: 'menu', component: MenuListComponent, canActivate: [AuthGuard] },
//   { path: '', component: LandingComponent }
//   // { path: 'about', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
