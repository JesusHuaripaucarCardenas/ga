import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupermarketCustomer } from '../../../core/interfaces/supermarket-customer';
import { SupermarketCustomerService } from '../../../core/services/supermarket-customer.service';
import { CheckoutService } from '../../../core/services/checkout.service';

@Component({
  selector: 'app-forms-supermercado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forms-supermercado.component.html',
  styleUrls: ['./forms-supermercado.component.scss']
})
export class FormsSupermercadoComponent {
  customer: SupermarketCustomer = {
    city: '', district: '', supermarketName: '', arrayAddress: '', ruc: '', phone: '', tipo: 'supermercado'
  };

  constructor(
    private customerService: SupermarketCustomerService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  submitForm() {
    this.customerService.save(this.customer).subscribe({
      next: () => {
        this.checkoutService.setCustomer(this.customer);
        this.router.navigate(['/payment-client']);
      },
      error: err => {
        console.error('Error al guardar:', err);
        alert('Ocurrió un error al guardar el cliente.');
      }
    });
  }
}