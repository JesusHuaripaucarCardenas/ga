// src/app/interfaces/product.ts
export interface Product {
  id?: number;
  name: string;
  selection_quantity: number;
  kl_quantity: number;
  output_log: string;  // lo recibes como ISO string
}
