// src/app/components/seller-form/seller-form.component.ts
import { Component } from '@angular/core';
import { Seller } from '../../../core/interfaces/seller';
import { SellerService } from '../../../core/services/seller.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-form',
  templateUrl: './seller-form.component.html',
  styleUrls: ['./seller-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule // 👈 Agregar aquí
  ]
})
export class SellerFormComponent {
  seller: Seller = { name: '', lastName: '', dni: '', phone: '', email: '' };

  constructor(private sellerService: SellerService) {}

  addSeller(): void {
    this.sellerService.save(this.seller).subscribe({
      next: saved => {
        console.log('Vendedor creado:', saved);
        // limpiar formulario
        this.seller = { name: '', lastName: '', dni: '', phone: '', email: '' };
      },
      error: err => {
        console.error('Error al crear vendedor', err);
      }
    });
  }
}
