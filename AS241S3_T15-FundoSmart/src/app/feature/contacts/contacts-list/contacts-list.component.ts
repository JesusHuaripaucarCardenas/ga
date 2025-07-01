import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule, NgForm }    from '@angular/forms';

export interface Cosecha {
pesoM: any;
peso5: any;
peso3: any;
fecha: any;
nombre: any;
  selM: any;
  sel5: any;
  sel3: any;
  peso1: any;
  sel1: any;
}

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']    // ← note the plural!
})
export class ContactsListComponent {
  @Input() cosecha: Cosecha = {
    fecha: '',
    nombre: '',
    sel1: 0, sel3: 0, sel5: 0, selM: 0,
    peso1: 0, peso3: 0, peso5: 0, pesoM: 0
  };
  @Output() save = new EventEmitter<Cosecha>();
  @Output() cancel = new EventEmitter<void>();

  guardarCambios() {
    // recalcula totales o cualquier lógica adicional si es necesario
    this.save.emit(this.cosecha);
  }

  cerrar() {
    this.cancel.emit();
  }

  totalSeleccion(): number {
    return this.cosecha.sel1 + this.cosecha.sel3 + this.cosecha.sel5 + this.cosecha.selM;
  }

  totalPeso(): number {
    return this.cosecha.peso1 + this.cosecha.peso1 + this.cosecha.peso1 + this.cosecha.peso1;
  }
}
