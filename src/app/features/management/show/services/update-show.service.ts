import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Show } from 'src/app/features/models';

@Injectable({
  providedIn: 'root',
})
export class UpdatehowService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateShow(show: Show) {
    const command = {
      status: show.status
    };

    return this.http.put(`${this.url}/shows/status/${show.id}`, command);
  }

  getAllShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.url}/shows`);
  }
}
