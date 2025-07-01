import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarketCustomerService } from '../../../core/services/market-customer.service';

@Component({
  selector: 'app-market-customer-form',
  standalone: true,
  templateUrl: './market-customer-form.component.html',
  styleUrls: ['./market-customer-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class MarketCustomerFormComponent implements OnInit {
  @Input() clienteSeleccionado: any = null;
  @Output() contactoGuardado = new EventEmitter<any>();
  @Output() modalCerrado = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private marketCustomerService: MarketCustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ciudad: ['', Validators.required],
      distrito: ['', Validators.required],
      nombreMercado: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)]],
      puesto: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      documento: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      tipoDocumento: ['', Validators.required],
      state: ['Activo', Validators.required] // Nuevo campo agregado
    });

    if (this.clienteSeleccionado) {
      this.form.patchValue({
        ciudad: this.clienteSeleccionado.city,
        distrito: this.clienteSeleccionado.district,
        nombreMercado: this.clienteSeleccionado.marketName,
        nombre: this.clienteSeleccionado.name,
        apellido: this.clienteSeleccionado.lastname,
        puesto: this.clienteSeleccionado.positionNumber,
        celular: this.clienteSeleccionado.phone,
        documento: this.clienteSeleccionado.documentNumber,
        tipoDocumento: this.clienteSeleccionado.documentType,
        state: this.clienteSeleccionado.state || 'Activo'
      });
    }
  }

  onAgregar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    const customer = {
      marketName: formValue.nombreMercado,
      positionNumber: formValue.puesto,
      name: formValue.nombre,
      lastname: formValue.apellido,
      documentType: formValue.tipoDocumento,
      documentNumber: formValue.documento,
      phone: formValue.celular,
      city: formValue.ciudad,
      district: formValue.distrito,
      state: formValue.state
    };

    this.marketCustomerService.save(customer).subscribe(() => {
      this.contactoGuardado.emit({
        tipo: 'mercado',
        mercado: formValue.nombreMercado,
        distrito: formValue.distrito,
        ciudad: formValue.ciudad,
        puesto: formValue.puesto,
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        tipoDocumento: formValue.tipoDocumento,
        documento: formValue.documento,
        celular: formValue.celular,
        state: formValue.state
      });

      this.form.reset();
      this.modalCerrado.emit();
    });
  }

  soloLetras(event: KeyboardEvent): void {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  soloNumeros(event: KeyboardEvent): void {
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  bloquearPegado(event: ClipboardEvent): void {
    event.preventDefault();
  }

  cerrar(): void {
    this.modalCerrado.emit();
  }
}
