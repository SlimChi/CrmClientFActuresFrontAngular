import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterRequest} from "../../service/swagger/services/models/register-request";
import {AuthenticationRequest} from "../../service/swagger/services/models/authentication-request";
import {AuthentificationService} from "../../service/swagger/services/services/authentification.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userDto: RegisterRequest = {firstName: '', lastName: '', email: '',password:'',phone:''};
  showPassword = false;
  public rememberMe: boolean = false;
  authRequest: AuthenticationRequest = {};
  errorMessages: Array<string> = [];
  errorMessage: Array<string> = [];
  url = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthentificationService,
  ) {

  }

  register() {
    this.errorMessages = [];

    this.authService.registerAdmin({
      body: this.userDto
    }).subscribe({
      next: async (data) => {
        await this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = err.error.validationErrors;
      }
    });
  }
}
