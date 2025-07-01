// src/app/services/news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Article {
  title: string;
  description: string;
  urlToImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getPeruNews(): Observable<Article[]> {
    const params = new HttpParams()
      .set('q', 'Perú')
      .set('language', 'es')
      .set('apiKey', environment.newsApiKey);

    return this.http.get<any>(`${environment.newsApiUrl}/everything`, { params })
      .pipe(
        map(resp => resp.articles.map((item: any) => ({
          title: item.title,
          description: item.description,
          urlToImage: item.urlToImage
        })))
      );
  }
  getThematicPeruNews(): Observable<Article[]> {
    const params = new HttpParams()
      .set('q', 'agronomía OR cultura peruana OR gastronomía peruana')
      .set('language', 'es')
      .set('sortBy', 'publishedAt')
      .set('apiKey', environment.newsApiKey);

    return this.http.get<any>(`${environment.newsApiUrl}/everything`, { params })
      .pipe(
        map(resp => resp.articles.map((item: any) => ({
          title: item.title,
          description: item.description,
          urlToImage: item.urlToImage
        })))
      );
  }
  getMarketNews(): Observable<Article[]> {
    const params = new HttpParams()
      .set('q', 'economía OR tipo de cambio OR inversiones OR empresas OR mercado financiero')
      .set('language', 'es')
      .set('sortBy', 'publishedAt')
      .set('apiKey', environment.newsApiKey);

    return this.http.get<any>(`${environment.newsApiUrl}/everything`, { params })
      .pipe(
        map(resp => resp.articles.map((item: any) => ({
          title: item.title,
          description: item.description,
          urlToImage: item.urlToImage
        })))
      );
  }

}
