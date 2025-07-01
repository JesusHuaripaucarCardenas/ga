import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { ProductsDetailService } from '../../../core/services/products-detail.service';
import { SellService } from '../../../core/services/sell.service';
import { Sell } from '../../../core/interfaces/sell';
import { Router, RouterModule } from '@angular/router';
import { SalesDataService } from '../../../core/services/sales-data.service';

interface InventoryRecord {
  id: number;
  nombre: string;
  totalesCantidad: number[];
  totalesPeso: number[];
}

@Component({
  selector: 'app-sell-form',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.scss'],
})
export class SellFormComponent implements OnInit {
  inventoryRecords: InventoryRecord[] = [];
  selectedRecordId: number | null = null;
  selectedCategory: string | null = null;

  inventoryCantidad: number[] = [0, 0, 0, 0];
  inventoryPeso: number[] = [0, 0, 0, 0];

  precios: number[] = [0, 0, 0, 0];
  cantidad: number[] = [0, 0, 0, 0];
  peso: number[] = [0, 0, 0, 0];
  totales: number[] = [0, 0, 0, 0];

  // ← aquí defines el kilo por caja
  pesoKilo: number = 15;

  errorCantidad: string[] = ['', '', '', ''];
  errorPeso: string[] = ['', '', '', ''];

  imagePreview: string | null = null;
  showErrorModal = false;
  errorMessages: string[] = [];

  constructor(
    private productsDetailService: ProductsDetailService,
    private salesData: SalesDataService,
    private sellService: SellService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadInventory();
  }

  private loadInventory(): void {
    this.productsDetailService.getAll().subscribe({
      next: data => {
        this.inventoryRecords = data.map(item => ({
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
          ]
        }));
      },
      error: err => console.error('Error cargando inventario', err)
    });
  }

  onSelectRecord(): void {
    const rec = this.inventoryRecords.find(r => r.id === this.selectedRecordId);
    if (!rec) return;
    this.inventoryCantidad = [...rec.totalesCantidad];
    this.inventoryPeso = [...rec.totalesPeso];

    this.cantidad.fill(0);
    this.peso.fill(0);
    this.precios.fill(0);
    this.totales.fill(0);
    this.errorCantidad.fill('');
    this.errorPeso.fill('');
  }

  updatePeso(index: number): void {
    this.peso[index] = this.cantidad[index] * this.pesoKilo;
    this.totales[index] = this.precios[index] * this.peso[index];

    const errores: string[] = [];

    if (this.cantidad[index] > this.inventoryCantidad[index]) {
      const msg = `Falta inventario: pediste ${this.cantidad[index]}, hay ${this.inventoryCantidad[index]}.`;
      this.errorCantidad[index] = msg;
      errores.push(msg);
    } else {
      this.errorCantidad[index] = '';
    }

    if (this.peso[index] > this.inventoryPeso[index]) {
      const msg = `Falta stock de peso: ${this.peso[index]}kg > ${this.inventoryPeso[index]}kg disponible.`;
      this.errorPeso[index] = msg;
      errores.push(msg);
    } else {
      this.errorPeso[index] = '';
    }

    if (errores.length) {
      this.errorMessages = errores;
      this.showErrorModal = true;
    }
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

  publish(): void {
    const pesoKiloReal = this.pesoKilo; // ← correctamente vinculado al input

    if (!this.selectedRecordId || !this.selectedCategory) {
      console.error("Producto o categoría no seleccionados.");
      return;
    }

    const rec = this.inventoryRecords.find(r => r.id === this.selectedRecordId)!;

    const sale: Sell = {
      name: rec.nombre,
      categoria: this.selectedCategory,
      firstSelection: this.cantidad[0],
      thirdSelection: this.cantidad[2],
      fifthSelection: this.cantidad[3],
      matureSelection: this.cantidad[1]
    };

    this.sellService.create(sale).subscribe({
      next: saved => {
        this.salesData.addSale(saved);

        console.log('Pesos que se envían:', this.peso);
        console.log('Peso kilo que se envía:', pesoKiloReal);

        this.router.navigate(
          [`/${this.selectedCategory}-cliente`, saved.id],
          {
            state: {
              pesos: this.peso,
              pesoKilo: this.pesoKilo,
              precios: this.precios,
              cantidades: this.cantidad
            }
          }
        );

        // Respaldo por si se recarga la página
        localStorage.setItem('pesoKiloBackup', this.pesoKilo.toString());
        localStorage.setItem('cantidadBackup', JSON.stringify(this.cantidad));

      },
      error: err => console.error('Error al publicar venta', err)
    });
  }
}