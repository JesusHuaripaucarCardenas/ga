import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MarketCustomer } from '../interfaces/market-customer';
import { SupermarketCustomer } from '../interfaces/supermarket-customer';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private customerSubject = new BehaviorSubject<MarketCustomer | SupermarketCustomer | null>(null);
  customer$ = this.customerSubject.asObservable();

  setCustomer(cust: MarketCustomer | SupermarketCustomer) {
    this.customerSubject.next(cust);
  }
}