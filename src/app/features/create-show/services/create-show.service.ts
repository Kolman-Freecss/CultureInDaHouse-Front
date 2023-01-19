import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateShowCommand } from '../models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CreateShowService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createShow(command: CreateShowCommand) {
    return this.http.post(`${this.url}/shows`, command);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`);
  }
}
