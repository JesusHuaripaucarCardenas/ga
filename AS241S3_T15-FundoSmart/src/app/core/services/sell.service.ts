import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sell } from '../interfaces/sell';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellService {
 private apiUrl = `${environment.apiUrl}/productsale`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Sell[]> {
    return this.http.get<Sell[]>(this.apiUrl);
  }

  getById(id: number): Observable<Sell> {
    return this.http.get<Sell>(`${this.apiUrl}/${id}`);
  }

  create(sale: Sell): Observable<Sell> {
    return this.http.post<Sell>(this.apiUrl, sale);
  }

  update(sale: Sell): Observable<Sell> {
    return this.http.put<Sell>(this.apiUrl, sale);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
