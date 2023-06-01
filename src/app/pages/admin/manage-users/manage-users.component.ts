import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../../service/swagger/services/models/user-dto";
import {UserControllerService} from "../../../service/swagger/services/services/user-controller.service";
import Swal from 'sweetalert2';
import {TokenService} from "../../../service/token-service/token.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})

export class ManageUsersComponent implements OnInit{
  users: Array<UserDto> = [];
  selectedUserId: number | undefined;

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

  deleteUser(userId: number) {
    Swal.fire({
      title: 'Confirmation de suppression',
      text: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'mr-2',
        cancelButton: 'ml-2'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // L'utilisateur a confirmé la suppression
        this.userService.deleteUser({ id: userId }).subscribe({
          next: () => {
            // Mise à jour de la liste des utilisateurs après suppression
            this.findAllUsers();
          },
          error: (error) => {
            // Gérer l'erreur de suppression de l'utilisateur
          },
        });
      }
    });
  }


  updateUser(userId: number, firstName: string, lastName: string, email: string, phone: string) {
    Swal.fire({
      title: 'Mise à jour de l\'utilisateur',
      html:
        `<div class="grid grid-cols-2 items-center mb-4">
        <label class="mb-2">Prénom:</label>
        <input id="firstName" class="border border-gray-300 rounded-md p-2" value="${firstName}">
      </div>` +
        `<div class="grid grid-cols-2 items-center mb-4">
        <label class="mb-2">Nom:</label>
        <input id="lastName" class="border border-gray-300 rounded-md p-2" value="${lastName}">
      </div>` +
        `<div class="grid grid-cols-2 items-center mb-4">
        <label class="mb-2">Email:</label>
        <input id="email" class="border border-gray-300 rounded-md p-2" value="${email}">
      </div>` +
        `<div class="grid grid-cols-2 items-center mb-4">
        <label class="mb-2">Téléphone:</label>
        <input id="phone" class="border border-gray-300 rounded-md p-2" value="${phone}">
      </div>`,
      showCancelButton: true,
      confirmButtonText: 'Mettre à jour',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'mr-2',
        cancelButton: 'ml-2'
      },
      preConfirm: () => {
        const updatedFirstName = (document.getElementById('firstName') as HTMLInputElement).value;
        const updatedLastName = (document.getElementById('lastName') as HTMLInputElement).value;
        const updatedEmail = (document.getElementById('email') as HTMLInputElement).value;
        const updatedPhone = (document.getElementById('phone') as HTMLInputElement).value;

        this.userService.updateUser({ id: userId, firstName: updatedFirstName, lastName: updatedLastName, email: updatedEmail, phone: updatedPhone })
          .subscribe({
            next: () => {
              // Mettre à jour l'utilisateur après la modification
              this.selectedUserId = undefined;
              this.findAllUsers();
              Swal.fire('Succès', 'Utilisateur mis à jour avec succès', 'success')
                .then(() => {
                  if (email !== updatedEmail) {
                    this.logout(); // Déconnexion de l'utilisateur
                    this.router.navigateByUrl('/login'); // Redirection vers la page de connexion
                  }
                });
            },
            error: (error) => {
              // Gérer l'erreur de mise à jour de l'utilisateur
              Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur', 'error');
            },
          });
      }
    });
  }

  logout(): void {
    this.tokenService.clearToken();
    this.router.navigateByUrl('/login');
  }
}
