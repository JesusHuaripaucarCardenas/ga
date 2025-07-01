// src/app/core/services/fruit-selection.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FruitSelection } from '../../core/interfaces/FruitSelection';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FruitSelectionService {
private apiUrl = `${environment.apiUrl}/fruitselection`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<FruitSelection[]> {
    return this.http.get<FruitSelection[]>(this.apiUrl);
  }

  save(selection: FruitSelection): Observable<FruitSelection> {
    return this.http.post<FruitSelection>(this.apiUrl, selection);
  }
}
