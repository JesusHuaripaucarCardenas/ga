import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketCustomerService } from '../../../core/services/market-customer.service';
import { MarketCustomer } from '../../../core/interfaces/market-customer';
import { EditMarketCustomerModalComponent } from '../../edit-customer/edit-market-customer-modal/edit-market-customer-modal.component';

@Component({
  selector: 'app-market-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    EditMarketCustomerModalComponent
  ],
  templateUrl: './market-customer-list.component.html',
  styleUrls: ['./market-customer-list.component.scss']
})
export class MarketCustomerListComponent implements OnInit {
  customers: MarketCustomer[] = [];

  mostrarFiltros = false;
  clienteSeleccionado?: MarketCustomer;
  mostrarModal = false;

  constructor(
    private marketCustomerService: MarketCustomerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.marketCustomerService.getAll().subscribe(data => {
      this.customers = data;
    });
  }

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  eliminar(customer: MarketCustomer) {
    if (customer.id != null) {
      this.marketCustomerService.delete(customer.id).subscribe(() => {
        customer.state = 'I';
      });
    }
  }

  recuperar(customer: MarketCustomer) {
    if (customer.id != null) {
      this.marketCustomerService.restore(customer.id).subscribe(() => {
        customer.state = 'A';
      });
    }
  }

  editar(cliente: MarketCustomer) {
    this.clienteSeleccionado = { ...cliente };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.clienteSeleccionado = undefined; // <- importante para limpiar
  }


actualizarCliente(clienteActualizado: MarketCustomer) {
  this.marketCustomerService.update(clienteActualizado).subscribe(() => {
    const index = this.customers.findIndex(c => c.id === clienteActualizado.id);
    if (index !== -1) {
      this.customers[index] = clienteActualizado;
    }
    this.mostrarModal = false;
    this.clienteSeleccionado = undefined;
    this.cdr.detectChanges();
  });
}


}
