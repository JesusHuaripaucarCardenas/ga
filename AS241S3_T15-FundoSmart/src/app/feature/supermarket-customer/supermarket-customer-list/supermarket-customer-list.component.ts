import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupermarketCustomer } from '../../../core/interfaces/supermarket-customer';
import { SupermarketCustomerService } from '../../../core/services/supermarket-customer.service';
import { EditSupermarketCustomerModalComponent } from '../../view-contact/edit-supermarket-customer-modal/edit-supermarket-customer-modal.component';

@Component({
  selector: 'app-supermarket-customer-list',
  standalone: true,
  imports: [CommonModule, EditSupermarketCustomerModalComponent],
  templateUrl: './supermarket-customer-list.component.html',
  styleUrls: ['./supermarket-customer-list.component.scss']
})
export class SupermarketCustomerListComponent implements OnInit {
  customers: SupermarketCustomer[] = [];
  loading   = false;
  error     = '';
  selectedCustomer: SupermarketCustomer | null = null;

  constructor(private svc: SupermarketCustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: data => {
        this.customers = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los clientes';
        this.loading = false;
      }
    });
  }

  onEdit(customer: SupermarketCustomer): void {
    this.selectedCustomer = customer;
  }

  onCloseModal(): void {
    this.selectedCustomer = null;
  }

onCustomerUpdated(updated: SupermarketCustomer): void {
  if (!updated.id) return;

  this.svc.update(updated).subscribe({
    next: (savedCustomer) => {
      const idx = this.customers.findIndex(c => c.id === savedCustomer.id);
      if (idx !== -1) {
        this.customers[idx] = savedCustomer;
      }
      this.onCloseModal();
    },
    error: () => {
      this.error = 'Error al actualizar el cliente';
    }
  });
}


  onDelete(customer: SupermarketCustomer): void {
    if (!customer.id) return;
    this.svc.delete(customer.id).subscribe(() => customer.state = 'I');
  }

  onRestore(customer: SupermarketCustomer): void {
    if (!customer.id) return;
    this.svc.restore(customer.id).subscribe(() => customer.state = 'A');
  }
}
