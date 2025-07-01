import { Component, OnInit } from '@angular/core';
import { PerfilClienteService } from '../../core/services/perfil-cliente.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss'],
  imports: [
    CommonModule,
    FormsModule, // <-- AGREGA ESTO
    // otros módulos si aplica
  ]
})
export class PerfilClienteComponent implements OnInit {
  cliente: any;

  constructor(
    private perfilClienteService: PerfilClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cliente = this.perfilClienteService.getCliente();

    if (!this.cliente) {
      alert('No hay datos de cliente');
      this.router.navigate(['/']); // Redirige si no hay datos
    }
  }
}
