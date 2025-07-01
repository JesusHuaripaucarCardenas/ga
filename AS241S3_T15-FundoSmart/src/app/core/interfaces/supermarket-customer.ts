export interface SupermarketCustomer {
  id?: number;
  city: string;
  district: string;
  supermarketName: string;
  arrayAddress: string;
  ruc: string;
  phone: string;
  state?: string;
  tipo?: 'supermercado';
}
