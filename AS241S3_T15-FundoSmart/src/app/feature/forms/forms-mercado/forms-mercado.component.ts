import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketCustomer } from '../../../core/interfaces/market-customer';
import { MarketCustomerService } from '../../../core/services/market-customer.service';
import { CheckoutService } from '../../../core/services/checkout.service';

@Component({
  selector: 'app-forms-mercado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forms-mercado.component.html',
  styleUrls: ['./forms-mercado.component.scss']
})
export class FormsMercadoComponent {
  marketCustomer: MarketCustomer = {
    city: '', district: '', marketName: '', positionNumber: '',
    name: '', lastname: '', documentType: '', documentNumber: '', phone: '', tipo: 'mercado'
  };

  constructor(
    private service: MarketCustomerService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  submitForm() {
    if (!this.marketCustomer.documentNumber || this.marketCustomer.documentNumber.length < 8) {
      alert('El número de documento no es válido');
      return;
    }
    this.service.save(this.marketCustomer).subscribe({
      next: () => {
        this.checkoutService.setCustomer(this.marketCustomer);
        this.router.navigate(['/payment-client']);
      },
      error: err => {
        console.error('Error al guardar', err);
        alert('Error al guardar los datos');
      }
    });
  }
}