import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- ¡IMPORTANTE!
import { MarketCustomerService } from '../../../core/services/market-customer.service';
import { MarketCustomer } from '../../../core/interfaces/market-customer';

@Component({
  selector: 'app-view-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // <-- Asegúrate de incluir esto
  ],
  templateUrl: './view-contact-form.component.html',
  styleUrls: ['./view-contact-form.component.scss']
})
export class ViewContactFormComponent implements OnInit {
  marketCustomers: MarketCustomer[] = [];
  mostrarModal = false;
  clienteEditando: MarketCustomer = {} as MarketCustomer;

  constructor(private marketCustomerService: MarketCustomerService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.marketCustomerService.getAll().subscribe(clientes => {
      this.marketCustomers = clientes;
    });
  }

  abrirModal(cliente: MarketCustomer): void {
    this.clienteEditando = { ...cliente };
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarCambios(): void {
    this.marketCustomerService.update(this.clienteEditando).subscribe(() => {
      const index = this.marketCustomers.findIndex(c => c.id === this.clienteEditando.id);
      if (index !== -1) {
        this.marketCustomers[index] = { ...this.clienteEditando };
      }
      this.cerrarModal();
    });
  }

  eliminarCliente(id?: number): void {
    if (!id) return;

    const confirmacion = confirm('¿Estás seguro de eliminar este cliente?');
    if (confirmacion) {
      this.marketCustomerService.delete(id).subscribe(() => {
        this.marketCustomers = this.marketCustomers.filter(c => c.id !== id);
      });
    }
  }
}


