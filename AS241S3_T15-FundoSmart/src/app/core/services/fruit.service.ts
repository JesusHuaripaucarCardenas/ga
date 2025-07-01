import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fruit } from '../interfaces/fruit';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FruitService {
private apiUrl = `${environment.apiUrl}/fruits`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(this.apiUrl);
  }

  findById(id: number): Observable<Fruit> {
    return this.http.get<Fruit>(`${this.apiUrl}/${id}`);
  }

  save(fruit: Fruit): Observable<Fruit> {
    return this.http.post<Fruit>(this.apiUrl, fruit);
  }

  update(fruit: Fruit): Observable<Fruit> {
    return this.http.put<Fruit>(this.apiUrl, fruit);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
