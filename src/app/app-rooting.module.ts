import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuardService} from "./service/guard/admin-guard/admin-guard.service";
import {TokenGuardService} from "./service/guard/token-guard/token-guard.service";
import {ManageUsersComponent} from "./pages/admin/manage-users/manage-users.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ManageInvoicesUserComponent} from "./pages/admin/manage-invoices-user/manage-invoices-user.component";
import {ManageCustomersComponent} from "./pages/admin/manage-customers/manage-customers.component";
import {DashboardComponent} from "./pages/admin/dashboard/dashboard.component";



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: LoginComponent},

  {
    path: 'admin',
    canActivate: [AdminGuardService, TokenGuardService],
    children: [
      {path: 'users', component: ManageUsersComponent},
      {path: 'manageInvoices', component: ManageInvoicesUserComponent},
      {path: 'customers', component: ManageCustomersComponent},
      {path: 'dashboard', component: DashboardComponent},

      {
        path: '', redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'user',
    canActivate: [TokenGuardService],
    children: [


      {
        path: '', redirectTo: 'user/home',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
