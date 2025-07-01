import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { FruitSelectionService } from '../../../core/services/fruit-selection';
import { FruitService } from '../../../core/services/fruit.service';
import { FruitSelection } from '../../../core/interfaces/FruitSelection';
import { Fruit } from '../../../core/interfaces/fruit';
import { CheckoutService } from '../../../core/services/checkout.service';
import { MarketCustomer } from '../../../core/interfaces/market-customer';
import { SupermarketCustomer } from '../../../core/interfaces/supermarket-customer';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';

@Component({
  selector: 'app-payment-client',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './payment-client.component.html',
  styleUrls: ['./payment-client.component.scss']
})
export class PaymentClientComponent implements OnInit {
  items: CartItem[] = [];
  client: MarketCustomer | SupermarketCustomer | null = null;
  clientName = '';
  exitDate = new Date().toISOString().slice(0, 10);
  paymentMethod: 'tarjeta' | 'efectivo' | 'yape' = 'tarjeta';

  constructor(
    private cartService: CartService,
    private fruitSelectionService: FruitSelectionService,
    private fruitService: FruitService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => this.items = items);
    this.checkoutService.customer$.subscribe(c => {
      this.client = c;
      if (c?.tipo === 'mercado') {
        this.clientName = `${c.name} ${c.lastname}`;
      } else if (c?.tipo === 'supermercado') {
        this.clientName = (c as SupermarketCustomer).supermarketName;
      }
    });
  }

  selectPayment(method: 'tarjeta' | 'efectivo' | 'yape') {
    this.paymentMethod = method;
  }

  onContinue(): void {
    if (!this.client || !this.clientName) {
      alert('Debe completar primero sus datos de cliente');
      return;
    }

    const kilosPorCaja = 20;

    const calcular = (sel: string) => {
      const filtrado = this.items.filter(i => i.seleccion === sel);
      const kilos = filtrado.reduce((sum, i) => sum + i.peso, 0);
      return {
        kilos,
        cajas: Math.floor(kilos / kilosPorCaja),
        precioPorKg: filtrado[0]?.precioPorKg ?? 0
      };
    };

    const pri = calcular('Seleccion primera');
    const ter = calcular('Seleccion tercera');
    const qui = calcular('Seleccion quinta');
    const mad = calcular('Seleccion madura');

    // 1. Guardar resumen en FruitSelection
    const fruitSelection: FruitSelection = {
      name: this.items.map(i => i.nombre).join(', '),
      firstSelection: pri.cajas,
      thirdSelection: ter.cajas,
      fifthSelection: qui.cajas,
      ripeSelection: mad.cajas,
      total: this.items.reduce((sum, i) => sum + i.peso * i.precioPorKg, 0),
      client: this.clientName,
      exitDate: this.exitDate
    };

    // 2. Construir objeto Fruit con todos los campos
    const fruit: Fruit = {
      id: 0, // será eliminado antes de enviar
      nom_frut: this.items[0]?.nombre ?? 'Fruta',
      kil_pri: parseFloat(pri.kilos.toFixed(2)),
      kil_ter: parseFloat(ter.kilos.toFixed(2)),
      kil_qui: parseFloat(qui.kilos.toFixed(2)),
      kil_mad: parseFloat(mad.kilos.toFixed(2)),
      can_pri: pri.cajas,
      can_ter: ter.cajas,
      can_qui: qui.cajas,
      can_mad: mad.cajas,
      pre_pri: pri.precioPorKg,
      pre_ter: ter.precioPorKg,
      pre_qui: qui.precioPorKg,
      pre_mad: mad.precioPorKg,
      fecha: this.exitDate
    };

    // 3. Guardar ambas entidades
    this.fruitSelectionService.save(fruitSelection).subscribe(() => {
      const { id, ...fruitPayload } = fruit; // 🔥 quitar id del payload

      this.fruitService.save(fruitPayload)
        .subscribe({
          next: () => this.router.navigate(['/historial']),
          error: err => {
            console.error('Error guardando en tabla frutas:', err);
            alert(`Error guardando datos detallados: ${err.status} — ${err.error?.message || err.message}`);
          }
        });
    });
  }
}
