import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupermarketCustomerService } from '../../../core/services/supermarket-customer.service';
import { SupermarketCustomer } from '../../../core/interfaces/supermarket-customer';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-supermarket-customer-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './supermarket-customer-form.component.html',
  styleUrls: ['./supermarket-customer-form.component.scss']
})
export class SupermarketCustomerFormComponent implements OnInit {
  @Input() clienteSeleccionado: any = null;
  @Output() saved = new EventEmitter<any>();
  @Output() modalCerrado = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private svc: SupermarketCustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ciudad:          ['', Validators.required],
      distrito:        ['', Validators.required],
      supermarketName: ['', Validators.required],
      ruc:             ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      arrayAddress:    ['', Validators.required],
      phone:           ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
    });

    if (this.clienteSeleccionado) {
      this.form.patchValue({
        ciudad: this.clienteSeleccionado.city,
        distrito: this.clienteSeleccionado.district,
        supermarketName: this.clienteSeleccionado.supermarketName,
        ruc: this.clienteSeleccionado.ruc,
        arrayAddress: this.clienteSeleccionado.arrayAddress,
        phone: this.clienteSeleccionado.phone,
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: SupermarketCustomer = {
      id: this.clienteSeleccionado?.id,
      city:             this.form.value.ciudad,
      district:         this.form.value.distrito,
      supermarketName:  this.form.value.supermarketName,
      arrayAddress:     this.form.value.arrayAddress,
      ruc:              this.form.value.ruc,
      phone:            this.form.value.phone
    };

    this.loading = true;
    this.errorMsg = '';

    const request = this.clienteSeleccionado?.id
      ? this.svc.update(payload)
      : this.svc.save(payload);

    request.pipe(
      catchError(err => {
        console.error(err);
        this.errorMsg = 'Error al guardar. Intenta nuevamente.';
        this.loading = false;
        return of(null);
      })
    ).subscribe(result => {
      this.loading = false;
      if (result) {
        this.saved.emit({
          tipo: 'supermercado',
          id: result.id,
          ciudad: result.city,
          distrito: result.district,
          tienda: result.supermarketName,
          ruc: result.ruc,
          direccionMatriz: result.arrayAddress,
          telefono: result.phone,
          state: result.state || 'Activo'
        });
        this.form.reset();
        this.modalCerrado.emit();
      }
    });
  }
}
