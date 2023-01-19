import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreatePerformanceCommand } from '../models';
import { environment } from 'src/environments/environment';
import { Show } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreatePerformanceService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createPerformance(command: CreatePerformanceCommand, idShow: number) {
    return this.http.put(`${this.url}/shows/${idShow}`, command);
  }

  getAllShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.url}/shows`);
  }
}
