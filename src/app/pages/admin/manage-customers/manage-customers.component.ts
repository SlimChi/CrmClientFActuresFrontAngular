import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {CustomerControllerService} from "../../../service/swagger/services/services/customer-controller.service";
import {CustomerDto} from "../../../service/swagger/services/models/customer-dto";



@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {
  customers: CustomerDto[] = [];
  paginatedCustomers: CustomerDto[] = [];
  filteredCustomers: any[] = []; // Ajout d'un tableau pour les clients filtrés
  itemsPerPage = 15;
  currentPage = 1;
  selectedCustomer: CustomerDto = {};
  loading: boolean = false;
  searchQuery: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';


  constructor(private customerService: CustomerControllerService) {}

  ngOnInit(): void {
    this.findAllCustomers();
  }

  private findAllCustomers() {
    this.loading = true;
    this.customerService.getCustomers().subscribe(
      (customers: CustomerDto[]) => {
        this.customers = customers;
        this.filterCustomers();
        this.updatePaginatedCustomers();
        this.loading = false;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des clients :', error);
        this.loading = false;
      }
    );
  }

  private filterCustomers() {
    if (this.searchQuery) {
      this.filteredCustomers = this.customers.filter((customer) =>
        customer.firstName?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCustomers = [...this.customers]; // Copier tous les clients si la recherche est vide
    }
  }

  searchCustomers() {
    this.currentPage = 1; // Réinitialiser la page actuelle lors d'une recherche
    this.filterCustomers();
    this.updatePaginatedCustomers();
  }

  sortCustomers(column: string) {
    if (column === this.sortColumn) {
      // Inverse la direction de tri si la même colonne est cliquée à nouveau
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Tri ascendant par défaut si une nouvelle colonne est cliquée
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Appeler la méthode pour mettre à jour la liste paginée des clients
    this.updatePaginatedCustomers();
  }


  private updatePaginatedCustomers() {
    // Trier les clients en fonction de la colonne et de la direction de tri
    const sortedCustomers = this.filteredCustomers.sort((a, b) => {
      if (a[this.sortColumn] > b[this.sortColumn]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else if (a[this.sortColumn] < b[this.sortColumn]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else {
        return 0;
      }
    });

    // Mettre à jour les clients paginés
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCustomers = sortedCustomers.slice(startIndex, endIndex);
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCustomers();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePaginatedCustomers();
    }
  }

  firstPage() {
    this.currentPage = 1;
    this.updatePaginatedCustomers();
  }

  lastPage() {
    const totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
    this.currentPage = totalPages;
    this.updatePaginatedCustomers();
  }



  deleteCustomer(idCustomer: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce client ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      customClass: {
        confirmButton: 'mr-2',
        cancelButton: 'ml-2'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const params = { customerId: idCustomer };
        this.customerService.deleteCustomer(params).subscribe(() => {
          Swal.fire('Supprimé !', 'Le client a été supprimé avec succès.', 'success');
          this.findAllCustomers();
        });
      }
    });
  }

  createCustomer(newCustomer: any) {
    Swal.fire({
      title: 'Créer un nouveau client',
      html: `
      <input type="text" id="firstName" class="swal2-input" placeholder="Prénom">
      <input type="text" id="lastName" class="swal2-input" placeholder="Nom">
      <input type="email" id="email" class="swal2-input" placeholder="Email">
      <input type="tel" id="phone" class="swal2-input" placeholder="Téléphone">
    `,
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      customClass: {
        confirmButton: 'mr-2',
        cancelButton: 'ml-2'
      },
      preConfirm: () => {
        const firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
        const lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
        const email = (<HTMLInputElement>document.getElementById('email')).value;
        const phone = (<HTMLInputElement>document.getElementById('phone')).value;

        // Créer un nouvel objet pour le nouveau client
        const customer = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone
        };

        // Retourner le nouveau client
        return customer;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const customerData = result.value;

        if (customerData) {
          const customerDto: CustomerDto = {
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            email: customerData.email,
            phone: customerData.phone
          };

          this.customerService.createCustomer({body: customerDto}).subscribe(() => {
            // Création réussie, mettez à jour la liste des clients
            this.findAllCustomers();
          });
        }
      }
    });
  }


  updateCustomer(idCustomer: number | undefined) {
    if (idCustomer) {
      const customerToUpdate = this.customers.find(customer => customer.customerId === idCustomer);
      if (customerToUpdate) {
        this.selectedCustomer = customerToUpdate;

        Swal.fire({
          title: 'Modifier le client',
          html: `
          <input type="text" id="firstName" class="swal2-input" value="${this.selectedCustomer.firstName}">
          <input type="text" id="lastName" class="swal2-input" value="${this.selectedCustomer.lastName}">
          <input type="email" id="email" class="swal2-input" value="${this.selectedCustomer.email}">
          <input type="tel" id="phone" class="swal2-input" value="${this.selectedCustomer.phone}">
        `,
          showCancelButton: true,
          confirmButtonText: 'Enregistrer',
          cancelButtonText: 'Annuler',
          focusConfirm: false,
          customClass: {
            confirmButton: 'mr-2',
            cancelButton: 'ml-2'
          },
          preConfirm: () => {
            const firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
            const lastName = (<HTMLInputElement>document.getElementById('lastName')).value;
            const email = (<HTMLInputElement>document.getElementById('email')).value;
            const phone = (<HTMLInputElement>document.getElementById('phone')).value;

            // Mettre à jour les valeurs du client sélectionné avec les nouvelles valeurs
            this.selectedCustomer.firstName = firstName;
            this.selectedCustomer.lastName = lastName;
            this.selectedCustomer.email = email;
            this.selectedCustomer.phone = phone;

            // Retourner le client mis à jour
            return this.selectedCustomer;
          }
        }).then((result) => {
          if (result.isConfirmed) {
            // Effectuer votre action de mise à jour avec les nouvelles valeurs
            this.customerService.updateCustomer({customerId: idCustomer, body: this.selectedCustomer}).subscribe(() => {
              // Mise à jour réussie, effectuez les actions supplémentaires si nécessaire
            });
          }
        });
      }
    }
  }
}
