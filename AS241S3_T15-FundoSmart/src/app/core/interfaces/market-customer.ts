export interface MarketCustomer {
  id?: number;
  city: string;
  district: string;
  marketName: string;
  positionNumber: string;
  name: string;
  lastname: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  state?: string;
  tipo?: 'mercado';
}