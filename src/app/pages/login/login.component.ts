import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../service/token-service/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HelperService} from "../../service/helper/helper.service";
import {AuthenticationRequest} from "../../service/swagger/services/models/authentication-request";
import {RegisterRequest} from "../../service/swagger/services/models/register-request";
import {AuthentificationService} from "../../service/swagger/services/services/authentification.service";
import {UserControllerService} from "../../service/swagger/services/services/user-controller.service";
import {GoogleSignInService} from "../../service/google-signIn/google-sign-in.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

  export class LoginComponent implements OnInit {

  userDto: RegisterRequest = {firstName: '', lastName: '', email: '',password:'',phone:''};
  showPassword = false;
  public rememberMe: boolean = false;
  authRequest: AuthenticationRequest = {};
  errorMessages: Array<string> = [];
  errorMessage: Array<string> = [];
  url = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthentificationService,
    private userService: UserControllerService,
    private helperService: HelperService,
    private tokenService: TokenService,
    private googleSigneInService: GoogleSignInService
  ) {

  }

  ngOnInit(): void {
    this.loading = true; }

  login() {

    this.errorMessage = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: async (data) => {
        localStorage.setItem('token', data.token as string);

        if (this.rememberMe) {
          console.log(data.token)
          // If "remember me" is checked, save the token in a cookie
          this.tokenService.savetokenInCookie(data.token as string);
        } else {
          // Otherwise, save the token in localStorage
          this.tokenService.savetoken(data.token as string);
        }

        this.tokenService.savetoken(data.token as string)
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(<string>data.token);
        console.log(decodedToken)
        if (decodedToken.authorities[0].authority === 'ADMIN') {
          await this.router.navigate(['admin/users']);
          window.location.reload();
        } else {
          await this.router.navigate(['user/']);
          window.location.reload();

        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.push(err.error.errorMessage);
      }
    });
  }


  signInWithGoogle() {
    this.googleSigneInService.googleSignIn().then(() => {
      // Redirigez ou effectuez d'autres actions après la connexion réussie avec Google
      // Par exemple, vous pouvez rediriger l'utilisateur vers une page spécifique
    }).catch((error) => {
      // Gérez les erreurs de connexion avec Google
      console.log(error);
    });
  }

}
