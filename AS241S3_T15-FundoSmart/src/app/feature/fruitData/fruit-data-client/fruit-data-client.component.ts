import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SalesDataService } from '../../../core/services/sales-data.service';
import { Sell } from '../../../core/interfaces/sell';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { HeaderComponent } from "../../../layout/header/header.component";

@Component({
  selector: 'app-fruit-data-client',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './fruit-data-client.component.html',
  styleUrls: ['./fruit-data-client.component.scss']
})
export class FruitDataClientComponent implements OnInit {
  // Propiedades ya declaradas
  sale!: Sell;
  pesos: number[] = [0, 0, 0, 0];
  pesoKilo!: number;
  preciosPorKg: number[] = [];
  cantidadMaxima: number[] = [0, 0, 0, 0]; // ← máximo de cajas permitidas por selección


  constructor(
    private route: ActivatedRoute,
    private salesData: SalesDataService,
    private router: Router,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  get cajasPrimera(): number {
    return Math.floor(this.pesos[0] / this.pesoKilo);
  }

  get cajasTercera(): number {
    return Math.floor(this.pesos[1] / this.pesoKilo);
  }

  get cajasQuinta(): number {
    return Math.floor(this.pesos[2] / this.pesoKilo);
  }

  get cajasMadura(): number {
    return Math.floor(this.pesos[3] / this.pesoKilo);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.salesData.sales$.subscribe(list => {
      this.sale = list.find(s => (s as any).id === id)!;
      if (!this.sale) {
        console.warn(`No se encontró una venta con ID ${id}`);
      }

    });

    const nav = this.router.getCurrentNavigation();
    const maybeState = nav?.extras?.state;

    if (maybeState && typeof maybeState === 'object') {
      const maybe = maybeState as {
        pesos?: number[],
        pesoKilo?: number,
        precios?: number[],
        cantidades?: number[]
      };

      this.pesos = maybe.pesos ?? [0, 0, 0, 0];
      this.preciosPorKg = maybe.precios ?? [1.06, 0.80, 0.60, 0.40];

      if (maybe.pesoKilo !== undefined) {
        this.pesoKilo = maybe.pesoKilo;
      } else if (isPlatformBrowser(this.platformId)) {
        const stored = localStorage.getItem('pesoKiloBackup');
        this.pesoKilo = stored ? Number(stored) : 15;
      } else {
        this.pesoKilo = 15;
      }

      if (maybe.cantidades !== undefined) {
        this.cantidadMaxima = maybe.cantidades;
      } else if (isPlatformBrowser(this.platformId)) {
        const storedCant = localStorage.getItem('cantidadBackup');
        this.cantidadMaxima = storedCant ? JSON.parse(storedCant) : [0, 0, 0, 0];
      } else {
        this.cantidadMaxima = [0, 0, 0, 0];
      }

    } else {
      // Fallback completo si todo falla
      this.pesos = [0, 0, 0, 0];
      this.preciosPorKg = [1.06, 0.80, 0.60, 0.40];

      if (isPlatformBrowser(this.platformId)) {
        const stored = localStorage.getItem('pesoKiloBackup');
        this.pesoKilo = stored ? Number(stored) : 15;

        const storedCant = localStorage.getItem('cantidadBackup');
        this.cantidadMaxima = storedCant ? JSON.parse(storedCant) : [0, 0, 0, 0];
      } else {
        this.pesoKilo = 15;
        this.cantidadMaxima = [0, 0, 0, 0];
      }
    }
  }



  showToast = false;
  toastMessage = '';

  // Método genérico para lanzar la alerta
  private triggerToast(message: string, duration = 2000): void {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, duration);
  }

  incrementPeso(index: number): void {
    const cajasActuales = Math.floor(this.pesos[index] / this.pesoKilo);
    const cajasDisponibles = this.cantidadMaxima[index];

    if (cajasActuales + 1 > cajasDisponibles) {
      this.stockMessage = `Stock insuficiente: ya usaste ${cajasActuales} de ${cajasDisponibles} cajas disponibles.`;
      this.showStockModal = true;
      return;
    }

    // Incrementar peso localmente
    this.pesos[index] += this.pesoKilo;
    this.triggerToast('Tu compra se agregó a tu carrito');

    // Validación segura antes de agregar al carrito
    if (!this.sale || this.sale.id == null || !this.sale.name) {
      console.error('Datos de producto no disponibles para agregar al carrito');
      return;
    }

    const precioPorKg = this.preciosPorKg[index];
    if (precioPorKg == null || isNaN(precioPorKg)) {
      console.error('Precio por kg no válido');
      return;
    }

    const selecciones = ['Seleccion primera', 'Seleccion tercera', 'Seleccion quinta', 'Seleccion madura'];
    const seleccion = selecciones[index] ?? 'Desconocido';

    // Agregar al carrito
    this.cartService.addItem({
      id: this.sale.id,
      nombre: this.sale.name,
      seleccion,
      peso: this.pesoKilo,
      precioPorKg
    });
  }


  decrementPeso(index: number): void {
    // solo si había algo que quitar
    if (this.pesos[index] > 0) {
      this.pesos[index] = Math.max(0, this.pesos[index] - this.pesoKilo);
      // ▶ disparar alerta de removido
      this.triggerToast('Se quitó del carrito');
    }
  }

  get totalKilos(): number {
    return this.pesos.reduce((sum, p) => sum + p, 0);
  }

  get totalPrecio(): number {
    const preciosPorKg = [1.06, 0.80, 0.60, 0.40];
    return this.pesos
      .map((p, i) => p * preciosPorKg[i])
      .reduce((sum, v) => sum + v, 0);
  }
  showStockModal = false;
  stockMessage = '';
  closeStockModal(): void {
    this.showStockModal = false;
  }

}
