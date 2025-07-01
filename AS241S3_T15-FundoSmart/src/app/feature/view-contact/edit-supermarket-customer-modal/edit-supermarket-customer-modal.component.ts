import {
  Component, OnInit, Input, Output, EventEmitter,
  OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupermarketCustomer } from '../../../core/interfaces/supermarket-customer';

@Component({
  selector: 'app-edit-supermarket-customer-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-supermarket-customer-modal.component.html',
  styleUrls: ['./edit-supermarket-customer-modal.component.scss']
})
export class EditSupermarketCustomerModalComponent implements OnInit, OnChanges {
  @Input() supermarketData!: SupermarketCustomer;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<SupermarketCustomer>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['supermarketData'] && this.supermarketData) {
      this.form = this.fb.group({
        city: [this.supermarketData.city, Validators.required],
        district: [this.supermarketData.district, Validators.required],
        supermarketName: [this.supermarketData.supermarketName, Validators.required],
        ruc: [this.supermarketData.ruc, [Validators.required, Validators.maxLength(11)]],
        arrayAddress: [this.supermarketData.arrayAddress, Validators.required],
        phone: [this.supermarketData.phone, [Validators.required, Validators.maxLength(15)]],
      });
    }
  }

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const updated: SupermarketCustomer = {
      ...this.supermarketData,
      ...this.form.value
    };
    this.save.emit(updated);
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
