import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

import Chart from 'chart.js/auto';
import {InvoiceControllerService} from "../../../service/swagger/services/services/invoice-controller.service";
import {InvoiceDto} from "../../../service/swagger/services/models/invoice-dto";


@Component({
  selector: 'app-manage-invoices-user',
  templateUrl: './manage-invoices-user.component.html',
  styleUrls: ['./manage-invoices-user.component.css']
})
export class ManageInvoicesUserComponent implements OnInit, AfterViewInit {
  invoices: any[] = [];
  paginatedInvoices: any[] = [];
  filteredInvoices: any[] = [];
  itemsPerPage = 15;
  currentPage = 1;
  loading: boolean = false;
  dropdownOpen: boolean = false;
  selectedFilter: string = 'Tous';
  sortBy: string = '';
  sortDirection: string = 'asc';
  totalPaidAmount: number = 0; // Montant total des factures payées
  totalUnpaidAmount: number = 0; // Montant total des factures impayées

  @ViewChild('pieChart', { static: false }) pieChartRef!: ElementRef;
  @ViewChild('lineChart', { static: false }) lineChartRef!: ElementRef;

  constructor(private invoiceService: InvoiceControllerService) {}

  ngOnInit(): void {
    this.findAllInvoices();
  }

  ngAfterViewInit(): void {
    this.generateLineChart();
  }

  private calculateTotalAmounts(invoices: InvoiceDto[]): { totalPaidAmount: number, totalUnpaidAmount: number } {
    // Calcul des montants totaux des factures payées et impayées
    const totalPaidAmount = invoices
      .filter((invoice) => invoice.status === 'PAID')
      .reduce((total, invoice) => total + (invoice.amount || 0), 0);

    const totalUnpaidAmount = invoices
      .filter((invoice) => invoice.status === 'UNPAID')
      .reduce((total, invoice) => total + (invoice.amount || 0), 0);

    return { totalPaidAmount, totalUnpaidAmount };
  }

  generatePieChart(totalPaidAmount: number, totalUnpaidAmount: number): void {
    const amounts = [totalPaidAmount, totalUnpaidAmount];
    const labels = ['Payé', 'Impayé'];
    const colors = [ 'rgb(75, 192, 192)','rgb(255, 99, 132)'];

    var myChart = new Chart("mychart", {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: amounts,
          backgroundColor: colors,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Répartition des montants des factures',
          },
        },
      },
    });
  }


  private findAllInvoices() {
    this.loading = true;
    this.invoiceService.getAllInvoices().subscribe(
      (invoices) => {
        this.invoices = invoices;
        this.updateFilteredInvoices();
        this.updatePaginatedInvoices();

        // Calculer les montants totaux des factures payées et impayées
        const { totalPaidAmount, totalUnpaidAmount } = this.calculateTotalAmounts(invoices);

        // Stocker les montants totaux calculés dans les variables appropriées
        this.totalPaidAmount = totalPaidAmount;
        this.totalUnpaidAmount = totalUnpaidAmount;
        console.log(this.totalUnpaidAmount);
        console.log(this.totalPaidAmount);

        // Utiliser les montants dans la fonction generatePieChart
        this.generatePieChart(this.totalPaidAmount, this.totalUnpaidAmount);

        // Extraire les montants et les dates
        const { amounts, dates } = this.extractAmountsAndDates(invoices);
        console.log(amounts);
        console.log(dates);

        this.loading = false;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des factures :', error);
        this.loading = false;
      }
    );
  }



  sortInvoices(column: string) {
    if (column === this.sortBy) {
      // Inverse la direction de tri si la même colonne est cliquée à nouveau
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Tri ascendant par défaut si une nouvelle colonne est cliquée
      this.sortBy = column;
      this.sortDirection = 'asc';
    }

    this.updatePaginatedInvoices();
  }

  private updatePaginatedInvoices() {
    // Appliquez le tri aux factures en fonction de la colonne et de la direction de tri
    const sortedInvoices = this.filteredInvoices.sort((a, b) => {
      if (a[this.sortBy] > b[this.sortBy]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else if (a[this.sortBy] < b[this.sortBy]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else {
        return 0;
      }
    });

    // Met à jour les factures paginées
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedInvoices = sortedInvoices.slice(startIndex, endIndex);
  }

  private updateFilteredInvoices() {
    if (this.selectedFilter === 'PAID') {
      this.filteredInvoices = this.invoices.filter((invoice) => invoice.status === 'PAID');
    } else if (this.selectedFilter === 'UNPAID') {
      this.filteredInvoices = this.invoices.filter((invoice) => invoice.status === 'UNPAID');
    } else {
      this.filteredInvoices = this.invoices;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterByStatus(status: string) {
    this.selectedFilter = status;
    this.updateFilteredInvoices();
    this.currentPage = 1;
    this.updatePaginatedInvoices();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedInvoices();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.filteredInvoices.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePaginatedInvoices();
    }
  }

  firstPage() {
    this.currentPage = 1;
    this.updatePaginatedInvoices();
  }

  lastPage() {
    const totalPages = Math.ceil(this.filteredInvoices.length / this.itemsPerPage);
    this.currentPage = totalPages;
    this.updatePaginatedInvoices();
  }


  deleteInvoice(invoiceId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette facture ?',
      text: "Cette action est irréversible.",
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
        const params = { invoiceId: invoiceId };
        this.invoiceService.deleteInvoice(params).subscribe(() => {
          Swal.fire('Supprimé !', 'La facture a été supprimée avec succès.', 'success');
          this.findAllInvoices();
        });
      }
    });
  }



  createInvoice(newInvoice: any) {
    Swal.fire({
      title: 'Créer une facture',
      html: `
      <input type="number" id="amount" class="swal2-input" placeholder="Montant">
      <input type="text" id="sentAt" class="swal2-input" placeholder="Date d'envoi">
      <input type="text" id="status" class="swal2-input" placeholder="Statut">
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
        const amount = Number((<HTMLInputElement>document.getElementById('amount')).value);
        const sentAt = (<HTMLInputElement>document.getElementById('sentAt')).value;
        const status = (<HTMLInputElement>document.getElementById('status')).value;

        const createdInvoice: InvoiceDto = {
          amount: amount,
          sentAt: sentAt,
          status: status
        };

        return createdInvoice;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          this.invoiceService.createInvoice({ body: result.value }).subscribe(() => {
            // Création réussie, mettez à jour la liste des factures
            this.findAllInvoices();
          });
        }
      }
    });
  }


  updateInvoice(invoiceId: number | undefined) {
    if (invoiceId) {
      const invoiceToUpdate = this.invoices.find(invoice => invoice.id === invoiceId);
      if (invoiceToUpdate) {
        Swal.fire({
          title: 'Modifier la facture',
          html: `
          <input type="number" id="amount" class="swal2-input" value="${invoiceToUpdate.amount}">
          <input type="text" id="sentAt" class="swal2-input" value="${invoiceToUpdate.sentAt}">
          <input type="text" id="status" class="swal2-input" value="${invoiceToUpdate.status}">
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
            const amount = Number((<HTMLInputElement>document.getElementById('amount')).value);
            const sentAt = (<HTMLInputElement>document.getElementById('sentAt')).value;
            const status = (<HTMLInputElement>document.getElementById('status')).value;

            return { amount: amount, sentAt: sentAt, status: status };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            if (result.value) {
              const updatedInvoice: InvoiceDto = {
                id: invoiceId,
                amount: result.value.amount,
                sentAt: result.value.sentAt,
                status: result.value.status
              };

              const requestParams = {
                id: invoiceId,
                body: updatedInvoice
              };

              this.invoiceService.updateInvoice(requestParams).subscribe(() => {
                // Mise à jour réussie, mettez à jour la liste des factures
                this.findAllInvoices();
              });
            }
          }
        });
      }
    }
  }

  generateLineChart(): void {
    const chartLabels: string[] = [];
    const chartData: number[] = [];

    // Parcourir les factures pour extraire les dates et les montants
    this.invoices.forEach((invoice: InvoiceDto) => {
      if (invoice.sentAt && invoice.amount) {
        chartLabels.push(invoice.sentAt);
        chartData.push(invoice.amount);
      }
    });

    // Créer le graphique de ligne avec les données extraites
    const chartElement: HTMLCanvasElement = this.lineChartRef.nativeElement;
    const chartContext = chartElement.getContext('2d');

    if (chartContext) {
      new Chart(chartContext, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Montant des factures',
            data: [1500, 1800, 2900, 2000, 3150, 4000],
            fill: false,
            borderColor: 'orange',
            tension: 0.4
          }]
        },
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
          scales: {
            y: { // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 5000
            }

          }
        }
      });
    }
  }

  private extractAmountsAndDates(invoices: any[]): { amounts: number[], dates: string[] } {
    const amounts: number[] = [];
    const dates: string[] = [];

    invoices.forEach((invoice) => {
      amounts.push(invoice.amount);
      dates.push(invoice.sentAt);
    });

    return { amounts, dates };
  }

}
