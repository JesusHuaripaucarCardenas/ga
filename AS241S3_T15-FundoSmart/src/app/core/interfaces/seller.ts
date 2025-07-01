export interface Seller {
  id?: number;      // opcional al crear
  name: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  state?: string;   // 'A' o 'I'
}
