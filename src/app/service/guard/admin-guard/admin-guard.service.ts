import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {TokenService} from "../../token-service/token.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      // @ts-ignore
      const decodedToken = helper.decodeToken(token);
      if (decodedToken.authorities[0].authority !== 'ADMIN') {
        this.router.navigate(['access-denied']);
        return false
      }
      if(this.tokenService.isLogged()){
        return true;
      }
      return this.router.navigate(['login'])
      return true;
    }
    return false;
  }
}
