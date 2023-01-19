import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Show } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UpdateShowService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.url}/shows`);
  }

  getShowDetails(id: number | null): Observable<Show> {
    return this.http.get<Show>(`${this.url}/shows/${id}`);
  }

  updateShow(command: Show) {
    return this.http.put(`${this.url}/shows`, command);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`);
  }
}
