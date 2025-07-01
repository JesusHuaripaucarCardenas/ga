import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilClienteService {
  private cliente: any = null;

  setCliente(cliente: any) {
    this.cliente = cliente;
  }

  getCliente() {
    return this.cliente;
  }

  clearCliente() {
    this.cliente = null;
  }
}
