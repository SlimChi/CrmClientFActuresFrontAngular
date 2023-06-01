import { Component } from '@angular/core';
import {TokenService} from "../../service/token-service/token.service";
import {HelperService} from "../../service/helper/helper.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen = false;
  isLogout = false;
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
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Déconnexion',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenService.clearToken();
        this.router.navigateByUrl('/login');
      }
    });
  }



  ngDoCheck(): void {
    const url = this.router.url;
    this.isLogout = !(url === '/login' || url === '/register');
  }
}
