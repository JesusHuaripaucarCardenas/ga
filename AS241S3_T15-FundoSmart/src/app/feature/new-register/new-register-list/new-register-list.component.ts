import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsDetailService } from '../../../core/services/products-detail.service';
import { FormsModule } from '@angular/forms';
import { ProductsDetail } from '../../../core/interfaces/products-detail';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";

interface RecordView {
  id?: number;  // ← Cambia de obligatorio a opcional
  fecha: Date;
  nombre: string;
  totalesCantidad: number[];
  totalesPeso: number[];
  confirmed: boolean;
}




@Component({
  selector: 'app-new-register-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],

  templateUrl: './new-register-list.component.html',
  styleUrls: ['./new-register-list.component.scss']
})
export class NewRegisterListComponent implements OnInit {
  records: RecordView[] = [];

  constructor(private productsDetailService: ProductsDetailService) { }

  ngOnInit(): void {
    this.loadRecords();
  }

  private loadRecords() {
    this.productsDetailService.getAll().subscribe({
      next: data => {
        // Asumimos que el backend devuelve ProductsDetail con campos de peso y cantidad
        // new-register-list.component.ts
        this.records = data
          .filter(item => item.id != null)
          .map(item => ({
            id: item.id!,
            fecha: new Date(),
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
            confirmed: item.confirmed // <-- usa el valor del backend
          }));


      },
      error: err => console.error('Error cargando registros', err)
    });
  }

  onEdit(rec: RecordView): void {
    this.selectedRecord = rec;
    this.modalVisible = true;

    // Copiar valores del registro al formulario temporal
    this.cosecha = {
      fecha: this.formatDate(rec.fecha),
      nombre: rec.nombre,
      sel1: rec.totalesCantidad[0],
      sel3: rec.totalesCantidad[1],
      sel5: rec.totalesCantidad[2],
      selM: rec.totalesCantidad[3],
      peso1: rec.totalesPeso[0],
      peso3: rec.totalesPeso[1],
      peso5: rec.totalesPeso[2],
      pesoM: rec.totalesPeso[3]
    };
  }

  // Para que el input date reciba bien el valor (yyyy-MM-dd)
  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }


  onDelete(rec: RecordView): void {
    if (!rec.id) return;

    const confirmacion = confirm(`¿Estás seguro de eliminar la cosecha de "${rec.nombre}"?`);
    if (!confirmacion) return;

    this.productsDetailService.delete(rec.id).subscribe({
      next: () => {
        // Eliminar del arreglo local
        this.records = this.records.filter(r => r.id !== rec.id);
        console.log('Registro eliminado correctamente');
      },
      error: err => {
        console.error('Error al eliminar el registro', err);
      }
    });
  }

  onConfirm(rec: RecordView): void {
    rec.confirmed = true;

    const detalle: ProductsDetail = {
      id: rec.id,
      name: rec.nombre,
      firstSelection: rec.totalesCantidad[0],
      klFirst: rec.totalesPeso[0],
      thirdSelection: rec.totalesCantidad[1],
      klThird: rec.totalesPeso[1],
      fifthSelection: rec.totalesCantidad[2],
      klFifth: rec.totalesPeso[2],
      matureSelection: rec.totalesCantidad[3],
      klMature: rec.totalesPeso[3],
      confirmed: rec.confirmed

    };

    this.productsDetailService.update(detalle).subscribe({
      next: () => console.log('Confirmado y guardado'),
      error: err => console.error('Error al confirmar', err)
    });
  }


  selectedRecord: RecordView | null = null;
  modalVisible: boolean = false;

  // Objeto auxiliar para editar (para evitar modificar directamente el array original)
  cosecha: any = {};
  cerrar(): void {
    this.modalVisible = false;
    this.selectedRecord = null;
  }

  guardarCambios(): void {
    if (this.selectedRecord) {
      // Actualiza localmente
      this.selectedRecord.fecha = new Date(this.cosecha.fecha);
      this.selectedRecord.nombre = this.cosecha.nombre;
      this.selectedRecord.totalesCantidad = [
        this.cosecha.sel1,
        this.cosecha.sel3,
        this.cosecha.sel5,
        this.cosecha.selM
      ];
      this.selectedRecord.totalesPeso = [
        this.cosecha.peso1,
        this.cosecha.peso3,
        this.cosecha.peso5,
        this.cosecha.pesoM
      ];

      // Crear objeto para enviar al backend
      const detalle: ProductsDetail = {
        id: this.selectedRecord.id,
        name: this.selectedRecord.nombre,
        firstSelection: this.selectedRecord.totalesCantidad[0],
        klFirst: this.selectedRecord.totalesPeso[0],
        thirdSelection: this.selectedRecord.totalesCantidad[1],
        klThird: this.selectedRecord.totalesPeso[1],
        fifthSelection: this.selectedRecord.totalesCantidad[2],
        klFifth: this.selectedRecord.totalesPeso[2],
        matureSelection: this.selectedRecord.totalesCantidad[3],
        klMature: this.selectedRecord.totalesPeso[3],
        confirmed: this.selectedRecord.confirmed


      };


      this.productsDetailService.update(detalle).subscribe({
        next: updated => {
          console.log('Actualizado en BD:', updated);
          this.cerrar();
        },
        error: err => {
          console.error('Error al actualizar', err);
        }
      });
    }
  }


  totalSeleccion(): number {
    return [this.cosecha.sel1, this.cosecha.sel3, this.cosecha.sel5, this.cosecha.selM]
      .reduce((acc, val) => acc + (Number(val) || 0), 0);
  }

  totalPeso(): number {
    return [this.cosecha.peso1, this.cosecha.peso3, this.cosecha.peso5, this.cosecha.pesoM]
      .reduce((acc, val) => acc + (Number(val) || 0), 0);
  }


}
