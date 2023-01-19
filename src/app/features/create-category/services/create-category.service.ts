import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateCategoryCommand } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createCategory(command: CreateCategoryCommand) {
    return this.http.post(`${this.url}/categories`, command);
  }
}
