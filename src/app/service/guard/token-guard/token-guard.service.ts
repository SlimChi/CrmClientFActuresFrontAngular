import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {TokenService} from "../../token-service/token.service";


@Injectable({ providedIn: 'root' })
export class TokenGuardService implements CanActivate {

  constructor(
      private router: Router,
      private tokenService: TokenService
  ) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['login']);
        return false;
      }
      const jwtHelper = new JwtHelperService();
      const isTokenExpired = jwtHelper.isTokenExpired(token);
      if (isTokenExpired) {
        localStorage.clear();
        this.router.navigate(['login']);
        return false;
      }
      if (this.tokenService.isLogged()) {
        return true;
      }
      this.router.navigate(['login']);
      return true;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'activation de la route :', error);
      // Gérer l'erreur de manière appropriée, par exemple, rediriger vers une page d'erreur générique.
      // Retourner false ou une UrlTree appropriée selon le cas.
      return false;
    }
  }

}
