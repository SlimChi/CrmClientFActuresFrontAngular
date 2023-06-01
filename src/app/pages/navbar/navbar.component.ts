import { Component } from '@angular/core';
import {TokenService} from "../../service/token-service/token.service";
import {HelperService} from "../../service/helper/helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen = false;

  constructor(
    private tokenService: TokenService,
    private helperService: HelperService,
    private router: Router,

  ) {   }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLogged();
  }

  logout(): void {
    this.tokenService.clearToken();
    this.router.navigateByUrl('/login');
  }

  isLogout = false;

  ngDoCheck(): void {
    const url = this.router.url;
    this.isLogout = !(url === '/login' || url === '/register');
  }
}
