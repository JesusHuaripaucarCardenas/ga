import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';

import { ProductsDetailService } from '../../../core/services/products-detail.service';
import { ProductsDetail } from '../../../core/interfaces/products-detail';

@Component({
  selector: 'app-new-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './new-register-form.component.html',
  styleUrls: ['./new-register-form.component.scss'],
})
export class NewRegisterFormComponent implements OnInit {

  // — Autocomplete frutas —
  frutasVariedades: string[] = [
    'Manzana Golden', 'Manzana Fuji', 'Manzana Red Delicious',
    'Banana Cavendish', 'Banana Manzano',
    'Pera Williams', 'Pera Conference',
    'Naranja Valencia', 'Naranja Navel',
    'Uva Red Globe', 'Uva Thompson',
    'Kiwi Zespri', 'Papaya Maradol', 'Mango Kent'
  ];
  frutaSeleccionada: string = '';

  // — Contabilidad —
  columnas: number[] = [0];
  resultados: number[][] = [[0], [0], [0], [0]];
  categorias: number[] = [0, 0, 0, 0];
  totales: number[] = [0, 0, 0, 0];

  // — Pesado —
  pesadoResultados: number[][] = [[0], [0], [0], [0]];
  pesadoCategorias: number[] = [0, 0, 0, 0];
  pesadoTotales: number[] = [0, 0, 0, 0];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productsDetailService: ProductsDetailService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const guardado = localStorage.getItem('frutasVariedades');
      if (guardado) {
        this.frutasVariedades = JSON.parse(guardado);
      }
    }

    this.calcularTotales();
    this.calcularPesadoTotales();
  }

  // — Guardar —
  onGuardar(): void {
    this.guardarNuevaSugerencia();

    const detalle: ProductsDetail = {
      name: this.frutaSeleccionada,
      firstSelection: this.categorias[0],
      klFirst: this.pesadoCategorias[0],
      thirdSelection: this.categorias[1],
      klThird: this.pesadoCategorias[1],
      fifthSelection: this.categorias[2],
      klFifth: this.pesadoCategorias[2],
      matureSelection: this.categorias[3],
      klMature: this.pesadoCategorias[3],
      confirmed: false
    };

    this.productsDetailService.save(detalle).subscribe({
      next: saved => {
        console.log('Guardado con éxito', saved);
        const record = {
          fecha: new Date(),
          nombre: saved.name,
          totalesCantidad: [...this.totales],
          totalesPeso: [...this.pesadoTotales]
        };
        console.log('Registro:', record);

        this.resetForm();
      },
      error: err => {
        console.error('Error al guardar', err);
      }
    });
  }

  // — Autocomplete —
  private guardarNuevaSugerencia(): void {
    const f = this.frutaSeleccionada.trim();
    if (!f) return;

    const existe = this.frutasVariedades.some(fruta =>
      fruta.toLowerCase() === f.toLowerCase()
    );

    if (!existe) {
      this.frutasVariedades.push(f);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('frutasVariedades', JSON.stringify(this.frutasVariedades));
      }
    }
  }

  // — Reset —
  private resetForm(): void {
    this.frutaSeleccionada = '';
    this.categorias = [0, 0, 0, 0];
    this.resultados = [[0], [0], [0], [0]];
    this.totales = [0, 0, 0, 0];

    this.pesadoCategorias = [0, 0, 0, 0];
    this.pesadoResultados = [[0], [0], [0], [0]];
    this.pesadoTotales = [0, 0, 0, 0];

    this.columnas = [0];

    this.calcularTotales();
    this.calcularPesadoTotales();
  }

  // — Contabilidad —
  agregarColumna(): void {
    this.columnas.push(this.columnas.length);
    this.resultados.forEach(fila => fila.push(0));
    this.calcularTotales();
  }

  eliminarUltimaColumna(): void {
    if (this.columnas.length > 1) {
      this.columnas.pop();
      this.resultados.forEach(fila => fila.pop());
      this.calcularTotales();
    }
  }

  calcularTotales(): void {
    this.totales = this.resultados.map((fila, i) => {
      const suma = fila.reduce((acc, v) => acc + (Number(v) || 0), 0);
      return suma + (Number(this.categorias[i]) || 0);
    });
  }

  // — Pesado —
  agregarColumnaPesado(): void {
    this.pesadoResultados.forEach(fila => fila.push(0));
    this.calcularPesadoTotales();
  }

  eliminarColumnaPesado(): void {
    if (this.pesadoResultados[0].length > 1) {
      this.pesadoResultados.forEach(fila => fila.pop());
      this.calcularPesadoTotales();
    }
  }

  calcularPesadoTotales(): void {
    this.pesadoTotales = this.pesadoResultados.map((fila, i) => {
      const suma = fila.reduce((acc, v) => acc + (Number(v) || 0), 0);
      return suma + (Number(this.pesadoCategorias[i]) || 0);
    });
  }

  // — Métodos vacíos (si los usarás en plantilla) —
  onBlurInput() {
    // Puedes implementar validaciones si es necesario
  }

onEnter(event: any): void {
  const valor = (event.target as HTMLInputElement).value;
  // …
}

}
