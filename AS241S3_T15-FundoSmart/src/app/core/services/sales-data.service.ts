import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sell } from '../interfaces/sell';

@Injectable({ providedIn: 'root' })
export class SalesDataService {
  private salesSubject = new BehaviorSubject<Sell[]>([]);
  sales$ = this.salesSubject.asObservable();

  constructor() {
    if (this.isBrowser()) {
      const stored = localStorage.getItem('ventas');
      if (stored) {
        this.salesSubject.next(JSON.parse(stored));
      }
    }
  }

  addSale(sale: Sell): void {
    const updated = [...this.salesSubject.value, sale];
    this.salesSubject.next(updated);

    if (this.isBrowser()) {
      localStorage.setItem('ventas', JSON.stringify(updated));
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
}
