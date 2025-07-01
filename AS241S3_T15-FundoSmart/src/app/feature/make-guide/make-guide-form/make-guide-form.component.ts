import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { ProductsDetailService } from '../../../core/services/products-detail.service';
import { ProductsDetail } from '../../../core/interfaces/products-detail';
import { MakeGuideListComponent } from "../make-guide-list/make-guide-list.component";
import { MarketCustomer } from '../../../core/interfaces/market-customer';

interface RecordView {
  id: number;
  nombre: string;
  totalesCantidad: number[];
  totalesPeso: number[];
  confirmed: boolean;
}

@Component({
  selector: 'app-make-guide-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, MakeGuideListComponent],
  templateUrl: './make-guide-form.component.html',
  styleUrls: ['./make-guide-form.component.scss']
})
export class MakeGuideFormComponent implements OnInit {
  records: RecordView[] = [];
  selectedName = '';
  selectedRecord: RecordView | null = null;
  quantities = [0, 0, 0, 0];
  weights = [0, 0, 0, 0];
  errorMessages = ['', '', '', ''];

  constructor(private productsDetailService: ProductsDetailService) {}

  ngOnInit(): void {
    this.productsDetailService.getAll().subscribe({
      next: data => {
        this.records = data
          .filter(item => item.id != null)
          .map((item: ProductsDetail) => ({
            id: item.id!,
            nombre: item.name,
            totalesCantidad: [
              item.firstSelection,
              item.thirdSelection,
              item.fifthSelection,
              item.matureSelection
            ],
            totalesPeso: [
              item.klFirst,
              item.klThird,
              item.klFifth,
              item.klMature
            ],
            confirmed: item.confirmed
          }));
      },
      error: err => console.error('Error cargando registros', err)
    });
  }

  /** Cuando cambia el nombre (datalist) */
  onNameChange(): void {
    this.selectedRecord = this.records.find(r => r.nombre === this.selectedName) || null;
    // Reset inputs
    this.quantities = [0, 0, 0, 0];
    this.weights = [0, 0, 0, 0];
    this.errorMessages = ['', '', '', ''];
  }

  /** Validación y cálculo de peso */
  onQuantityChange(index: number): void {
    if (!this.selectedRecord) return;

    const maxQty = this.selectedRecord.totalesCantidad[index];
    const maxWeight = this.selectedRecord.totalesPeso[index];
    const qty = this.quantities[index] || 0;
    let error = '';

    // Verificar cantidad
    if (qty > maxQty) {
      error = 'Recursos insuficientes';
    }

    // Cálculo del peso por unidad
    const unitWeight = maxQty ? maxWeight / maxQty : 0;
    const computedWeight = qty * unitWeight;

    // Verificar peso
    if (!error && computedWeight > maxWeight) {
      error = 'Unidades excesivas, pocos kilos';
    }

    this.weights[index] = computedWeight;
    this.errorMessages[index] = error;
  }
  get totalQuantity(): number {
  return this.quantities.reduce((a, b) => a + (b || 0), 0);
}

get totalWeight(): number {
  return this.weights.reduce((a, b) => a + (b || 0), 0);
}
showModal = false;

openModal(): void {
  this.showModal = true;
}

closeModal(): void {
  this.showModal = false;
}

onCustomerSelected(customer: MarketCustomer): void {
  this.closeModal();

  const producto = this.selectedRecord?.nombre || 'Producto';
  const cantidades = this.quantities;
  const selecciones = ['1°ra', '3°ra', '5°ta', 'Madura'];
  const detalle = selecciones
    .map((sel, i) => `${sel}: ${cantidades[i] || 0}`)
    .join('\n');

  const total = this.totalQuantity;

  const mensaje = `
Hola ${customer.name} 👋,
Tu guía para el pedido en ${customer.marketName} (Puesto #${customer.positionNumber}, ${customer.district}) ya está lista.

Producto: ${producto}
${detalle}
Total de unidades: ${total}

💳 Aceptamos transferencias y Yape.
¡Gracias por preferirnos!
  `.trim();

  const telefono = customer.phone?.replace(/\D/g, '');
  if (telefono) {
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  } else {
    console.warn('Cliente sin teléfono');
  }
}


}