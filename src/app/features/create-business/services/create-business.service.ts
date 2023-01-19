import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateBusinessCommand } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateBusinessService {
  private url = environment.apiUrl + "/companies";

  constructor(
    private http: HttpClient
  ) { }

  createBusiness(command: CreateBusinessCommand) {
    return this.http.post(`${this.url}`, command);
  }
}
