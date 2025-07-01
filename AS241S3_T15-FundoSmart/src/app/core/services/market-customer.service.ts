import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarketCustomer } from '../../core/interfaces/market-customer';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketCustomerService {
  private apiUrl = `${environment.apiUrl}/marketcustomer`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MarketCustomer[]> {
    return this.http.get<MarketCustomer[]>(this.apiUrl);
  }

  getById(id: number): Observable<MarketCustomer> {
    return this.http.get<MarketCustomer>(`${this.apiUrl}/${id}`);
  }

  save(customer: MarketCustomer): Observable<MarketCustomer> {
    return this.http.post<MarketCustomer>(this.apiUrl, customer);
  }

  update(customer: MarketCustomer): Observable<MarketCustomer> {
    return this.http.put<MarketCustomer>(this.apiUrl, customer);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }

  restore(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, null, { responseType: 'text' });
  }
}
