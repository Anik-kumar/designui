import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// const routes: Routes = [];
const routes: Routes = [{ path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) }
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
