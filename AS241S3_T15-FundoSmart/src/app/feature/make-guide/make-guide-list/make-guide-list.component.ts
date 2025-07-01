import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketCustomerService } from '../../../core/services/market-customer.service';
import { MarketCustomer } from '../../../core/interfaces/market-customer';

@Component({
  selector: 'app-make-guide-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './make-guide-list.component.html',
  styleUrls: ['./make-guide-list.component.scss']
})
export class MakeGuideListComponent implements OnInit {
  customers: MarketCustomer[] = [];

  constructor(private marketService: MarketCustomerService) { }

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.marketService.getAll().subscribe({
      next: data => this.customers = data,
      error: err => console.error(err)
    });
  }
@Output() contactSelected = new EventEmitter<MarketCustomer>();

sendGuide(customer: MarketCustomer) {
  this.contactSelected.emit(customer); // En vez de abrir WhatsApp aquí
}
  /** 
   * Abre WhatsApp Web o App móvil con un mensaje prellenado.
   */
  
}
