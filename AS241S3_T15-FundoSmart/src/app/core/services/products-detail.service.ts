import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsDetail } from '../interfaces/products-detail';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductsDetailService {
  private apiUrl = `${environment.apiUrl}/productsdetail`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductsDetail[]> {
    return this.http.get<ProductsDetail[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProductsDetail> {
    return this.http.get<ProductsDetail>(`${this.apiUrl}/${id}`);
  }

  save(pd: ProductsDetail): Observable<ProductsDetail> {
    return this.http.post<ProductsDetail>(this.apiUrl, pd);
  }

  update(pd: ProductsDetail): Observable<ProductsDetail> {
    return this.http.put<ProductsDetail>(this.apiUrl, pd);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
