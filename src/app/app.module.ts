import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./service/http-interceptor/token.interceptor";
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RegisterComponent } from './pages/register/register.component';
import { ManageInvoicesUserComponent } from './pages/admin/manage-invoices-user/manage-invoices-user.component';
import { ManageCustomersComponent } from './pages/admin/manage-customers/manage-customers.component';
import {AppRoutingModule} from "./app-rooting.module";
import { SpinnerComponent } from './pages/spinner/spinner.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { Spinner2Component } from './pages/spinner2/spinner2.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "./environement";
import {ToastrModule} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
@NgModule({
  declarations: [
    AppComponent,
    ManageUsersComponent,
    LoginComponent,
    RegisterComponent,
    ManageInvoicesUserComponent,
    ManageCustomersComponent,
    SpinnerComponent,
    DashboardComponent,
    NavbarComponent,
    Spinner2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports : [
    SpinnerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
