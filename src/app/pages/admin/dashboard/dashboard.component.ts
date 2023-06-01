import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../../service/swagger/services/models/user-dto";
import {UserControllerService} from "../../../service/swagger/services/services/user-controller.service";
import {TokenService} from "../../../service/token-service/token.service";
import {HelperService} from "../../../service/helper/helper.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  users: Array<UserDto> = [];
  selectedUserId: number | undefined;
  isLogout = false;

  constructor(
    private userService: UserControllerService,
    private tokenService: TokenService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.findAllUsers();

  }

  private findAllUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
  selectUser(userId: number) {
    this.selectedUserId = userId;
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
}
