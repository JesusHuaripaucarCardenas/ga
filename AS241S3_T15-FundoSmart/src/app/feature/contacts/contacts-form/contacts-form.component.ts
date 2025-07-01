import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { MarketCustomerFormComponent } from '../../market-customer/market-customer-form/market-customer-form.component';
import { SupermarketCustomerFormComponent } from '../../supermarket-customer/supermarket-customer-form/supermarket-customer-form.component';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";
import { EditMarketCustomerModalComponent } from '../../edit-customer/edit-market-customer-modal/edit-market-customer-modal.component';
import { EditSupermarketCustomerModalComponent } from '../../view-contact/edit-supermarket-customer-modal/edit-supermarket-customer-modal.component';

import { MarketCustomerService } from '../../../core/services/market-customer.service';
import { SupermarketCustomerService } from '../../../core/services/supermarket-customer.service';

import { MarketCustomer } from '../../../core/interfaces/market-customer';
import { SupermarketCustomer } from '../../../core/interfaces/supermarket-customer';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [
    CommonModule,
    MarketCustomerFormComponent,
    SupermarketCustomerFormComponent,
    NavbarComponent,
    EditMarketCustomerModalComponent,
    EditSupermarketCustomerModalComponent
  ],
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent implements OnInit {
  contactos: any[] = [];
  mostrarFiltros = false;

  // MARKET
  marketCustomers: MarketCustomer[] = [];
  mostrarModalMarketCustomer = false;
  clienteSeleccionadoMarket?: MarketCustomer;
  mostrarModalMarket = false;

  // SUPERMARKET
  supermarketCustomers: SupermarketCustomer[] = [];
  mostrarModalSupermarketCustomer = false;
  selectedCustomerSupermarket: SupermarketCustomer | null = null;
  loading = false;
  error = '';

  // Métodos y propiedades usados en el template para mercado
  mostrarModal: boolean = false;
  clienteSeleccionado?: MarketCustomer;

  editar(customer: MarketCustomer): void {
    this.editarMarket(customer);
  }

  eliminar(customer: MarketCustomer): void {
    this.eliminarMarket(customer);
  }

  recuperar(customer: MarketCustomer): void {
    this.recuperarMarket(customer);
  }

  actualizarCliente(clienteActualizado: MarketCustomer): void {
    this.actualizarClienteMarket(clienteActualizado);
  }

  cerrarModal(): void {
    this.cerrarModalMarket();
  }

  // Métodos y propiedades usados en el template para supermercado
  selectedCustomer: SupermarketCustomer | null = null;

  onEdit(customer: SupermarketCustomer): void {
    this.onEditSupermarket(customer);
  }

  onDelete(customer: SupermarketCustomer): void {
    this.onDeleteSupermarket(customer);
  }

  onRestore(customer: SupermarketCustomer): void {
    this.onRestoreSupermarket(customer);
  }

  onCloseModal(): void {
    this.onCloseModalSupermarket();
  }

  onCustomerUpdated(updated: SupermarketCustomer): void {
    this.onCustomerUpdatedSupermarket(updated);
  }

  cerrarModalSupermarketCustomer(): void {
    this.onCloseModalSupermarket();
  }

  constructor(
    private router: Router,
    private marketCustomerService: MarketCustomerService,
    private supermarketCustomerService: SupermarketCustomerService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const datosGuardados = localStorage.getItem('contactos');
      if (datosGuardados) {
        this.contactos = JSON.parse(datosGuardados);
      }
    }

    this.loadMarketCustomers();
    this.loadSupermarketCustomers();
  }

  // ================= Market Logic ===================
  loadMarketCustomers(): void {
    this.marketCustomerService.getAll().subscribe(data => {
      this.marketCustomers = data;
    });
  }

  cerrarModalMarketCustomer(): void {
    this.mostrarModalMarketCustomer = false;
  }

  editarMarket(cliente: MarketCustomer): void {
    this.clienteSeleccionadoMarket = { ...cliente };
    this.clienteSeleccionado = this.clienteSeleccionadoMarket;
    this.mostrarModalMarket = true;
    this.mostrarModal = true;
  }

  cerrarModalMarket(): void {
    this.mostrarModalMarket = false;
    this.clienteSeleccionadoMarket = undefined;
    this.clienteSeleccionado = undefined;
    this.mostrarModal = false;
  }

  actualizarClienteMarket(clienteActualizado: MarketCustomer): void {
    this.marketCustomerService.update(clienteActualizado).subscribe(() => {
      const index = this.marketCustomers.findIndex(c => c.id === clienteActualizado.id);
      if (index !== -1) {
        this.marketCustomers[index] = clienteActualizado;
      }
      this.cerrarModalMarket();
      this.cdr.detectChanges();
    });
  }

  eliminarMarket(customer: MarketCustomer): void {
    if (customer.id != null) {
      this.marketCustomerService.delete(customer.id).subscribe(() => {
        customer.state = 'I';
      });
    }
  }

  recuperarMarket(customer: MarketCustomer): void {
    if (customer.id != null) {
      this.marketCustomerService.restore(customer.id).subscribe(() => {
        customer.state = 'A';
      });
    }
  }

  // ================ Supermarket Logic ==================
  loadSupermarketCustomers(): void {
    this.loading = true;
    this.supermarketCustomerService.getAll().subscribe({
      next: data => {
        this.supermarketCustomers = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los clientes';
        this.loading = false;
      }
    });
  }

  onEditSupermarket(customer: SupermarketCustomer): void {
    this.selectedCustomerSupermarket = customer;
    this.selectedCustomer = customer;
  }

  onCloseModalSupermarket(): void {
    this.selectedCustomerSupermarket = null;
    this.selectedCustomer = null;
  }

  onCustomerUpdatedSupermarket(updated: SupermarketCustomer): void {
    if (!updated.id) return;

    this.supermarketCustomerService.update(updated).subscribe({
      next: (savedCustomer) => {
        const idx = this.supermarketCustomers.findIndex(c => c.id === savedCustomer.id);
        if (idx !== -1) {
          this.supermarketCustomers[idx] = savedCustomer;
        }
        this.onCloseModalSupermarket();
      },
      error: () => {
        this.error = 'Error al actualizar el cliente';
      }
    });
  }

  onDeleteSupermarket(customer: SupermarketCustomer): void {
    if (!customer.id) return;
    this.supermarketCustomerService.delete(customer.id).subscribe(() => customer.state = 'I');
  }

  onRestoreSupermarket(customer: SupermarketCustomer): void {
    if (!customer.id) return;
    this.supermarketCustomerService.restore(customer.id).subscribe(() => customer.state = 'A');
  }

  // ================== Contactos =======================
  agregarContacto(contacto: any): void {
    contacto.tipo = contacto.tipo || 'supermercado';

    const yaExiste = this.contactos.some(c =>
      c.tipo === contacto.tipo &&
      (
        (c.tipo === 'mercado' &&
          c.mercado === contacto.mercado &&
          c.puesto === contacto.puesto &&
          c.cliente === contacto.cliente) ||
        (c.tipo === 'supermercado' && c.ruc === contacto.ruc)
      )
    );

    if (!yaExiste) {
      this.contactos.unshift(contacto);
      localStorage.setItem('contactos', JSON.stringify(this.contactos));
    }
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }
}
