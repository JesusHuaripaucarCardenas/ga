// src/app/services/seller.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seller } from '../interfaces/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private baseUrl = 'http://localhost:8085/v1/api/seller';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.baseUrl);
  }

  findById(id: number): Observable<Seller> {
    return this.http.get<Seller>(`${this.baseUrl}/${id}`);
  }

  save(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.baseUrl, seller);
  }

  update(seller: Seller): Observable<Seller> {
    return this.http.put<Seller>(this.baseUrl, seller);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  restore(id: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/restore/${id}`, null, { responseType: 'text' });
  }
}
