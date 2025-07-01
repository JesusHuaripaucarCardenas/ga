import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SupermarketCustomer } from '../interfaces/supermarket-customer';

@Injectable({ providedIn: 'root' })
export class SupermarketCustomerService {
  private apiUrl = `${environment.apiUrl}/supermarket-customer`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SupermarketCustomer[]> {
    return this.http.get<SupermarketCustomer[]>(this.apiUrl);
  }

  getById(id: number): Observable<SupermarketCustomer> {
    return this.http.get<SupermarketCustomer>(`${this.apiUrl}/${id}`);
  }

  save(customer: SupermarketCustomer): Observable<SupermarketCustomer> {
    return this.http.post<SupermarketCustomer>(`${this.apiUrl}/save`, customer);
  }

  update(customer: SupermarketCustomer): Observable<SupermarketCustomer> {
    return this.http.put<SupermarketCustomer>(`${this.apiUrl}/update`, customer);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }

  restore(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, null, { responseType: 'text' });
  }
}
