import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SearchShowsQuery } from '../models';
import { Category, Show } from '../../models';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SearchShowsService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe
  ) { }

  searchShows(query: SearchShowsQuery): Observable<Show[]> {
    let params = new HttpParams();
    if (query.name !== null && query.name !== '') params = params.append('name', query.name);
    if (query.category !== null) params = params.append('categoryId', query.category.id);
    if (query.onSaleDate !== null) {
      const date = this.datepipe.transform(query.onSaleDate, 'dd/MM/yyyy');
      if (date !== null)
        params = params.append('date', date);
    }
    if (query.status !== null) params = params.append('status', query.status);

    return this.http.get<Show[]>(`${this.url}/shows`, { params: params });
  }

  searchShowsByName(name: string): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.url}/shows/name/${name}`);
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.url}/categories`);
  }
}
