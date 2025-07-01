import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MarketCustomer } from '../../../core/interfaces/market-customer';

@Component({
  selector: 'app-edit-market-customer-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './edit-market-customer-modal.component.html',
  styleUrls: ['./edit-market-customer-modal.component.scss']
})
export class EditMarketCustomerModalComponent {
@Input() cliente: MarketCustomer = {
  id: 0,
  name: '',
  lastname: '',
  city: '',
  district: '',
  phone: '',
  positionNumber: '',
  documentNumber: '',
  documentType: '',
  state: 'A',
  marketName: '' // ✅ Agregado para cumplir con la interfaz
};


  @Output() actualizar = new EventEmitter<MarketCustomer>();
  @Output() cerrarModal = new EventEmitter<void>();

  guardarCambios() {
    this.actualizar.emit(this.cliente);
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}
