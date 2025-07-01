import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from "../../../layout/header/header.component";


@Component({
  selector: 'app-cart-client',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './cart-client.component.html',
  styleUrls: ['./cart-client.component.scss']
})
export class CartClientComponent implements OnInit {
  items: CartItem[] = [];
  totalPrecio = 0;
  totalCajas = 0;
  pesoKilo = 15; // ← agregada aquí

  constructor(
  private cartService: CartService,
  @Inject(PLATFORM_ID) private platformId: Object
) {}


  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const stored = localStorage.getItem('pesoKiloBackup');
    this.pesoKilo = stored ? Number(stored) : 15;
  } else {
    this.pesoKilo = 15; // fallback seguro
  }

  this.cartService.items$.subscribe(items => {
    this.items = items;
    this.totalPrecio = this.cartService.getTotalPrecio();
    this.totalCajas = this.cartService.getTotalCajas(this.pesoKilo);
  });
}


  incrementarPeso(item: CartItem) {
    item.peso += this.pesoKilo;
    this.actualizarCarrito();
  }

  disminuirPeso(item: CartItem) {
    item.peso = Math.max(0, item.peso - this.pesoKilo);
    if (item.peso === 0) {
      this.quitarItem(item);
    } else {
      this.actualizarCarrito();
    }
  }

  actualizarCarrito() {
    this.cartService.updateItems(this.items);
    this.totalPrecio = this.cartService.getTotalPrecio();
    this.totalCajas = this.cartService.getTotalCajas(this.pesoKilo);
  }

  quitarItem(item: CartItem) {
    this.cartService.removeItem(item);
  }
}