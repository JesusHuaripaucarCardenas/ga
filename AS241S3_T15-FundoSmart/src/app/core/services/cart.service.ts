import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id?: number;
  nombre: string;
  peso: number;
  precioPorKg: number;
  seleccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'cart';
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();
  private pesoKilo = 15;

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          this.itemsSubject.next(JSON.parse(saved));
        } catch {}
      }

      const storedKilo = localStorage.getItem('pesoKiloBackup');
      this.pesoKilo = storedKilo ? Number(storedKilo) : 15;
    }
  }

  private saveCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itemsSubject.value));
    }
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  /** ✅ Agrega ítems acumulando si ya existe */
  addItem(item: CartItem) {
    const current = this.itemsSubject.value;

    const existingIndex = current.findIndex(i =>
      i.id === item.id &&
      i.seleccion === item.seleccion &&
      i.precioPorKg === item.precioPorKg
    );

    if (existingIndex !== -1) {
      // Ya existe: sumar peso
      current[existingIndex].peso += item.peso;
    } else {
      // Nuevo ítem
      current.push({ ...item });
    }

    this.itemsSubject.next([...current]);
    this.saveCart();
  }

  /** 🔁 Actualiza completamente la lista de ítems */
  updateItems(items: CartItem[]) {
    this.itemsSubject.next(items);
    this.saveCart();
  }

  /** 🗑️ Quita un ítem exacto */
  removeItem(item: CartItem) {
    const filtered = this.itemsSubject.value.filter(i =>
      !(i.id === item.id &&
        i.seleccion === item.seleccion &&
        i.precioPorKg === item.precioPorKg)
    );

    this.itemsSubject.next(filtered);
    this.saveCart();
  }

  /** 💰 Total del precio */
  getTotalPrecio(): number {
    return this.itemsSubject.value
      .reduce((sum, i) => sum + i.peso * i.precioPorKg, 0);
  }

  /** 📦 Total de cajas basado en el peso por caja */
  getTotalCajas(pesoPorCaja: number): number {
    return Math.ceil(
      this.itemsSubject.value.reduce((sum, i) => sum + i.peso, 0)
      / pesoPorCaja
    );
  }

  getPesoKilo(): number {
    return this.pesoKilo;
  }

  setPesoKilo(value: number): void {
    this.pesoKilo = value;
    localStorage.setItem('pesoKiloBackup', String(value));
  }
}
