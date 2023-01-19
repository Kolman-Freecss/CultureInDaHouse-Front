import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Business } from "../../models";
import { SearchBusinessQuery } from "../models";

@Injectable({
  providedIn: 'root'
})
export class SearchBusinessService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  searchBusinessByName(query: SearchBusinessQuery): Observable<Business[]> {
    let params = new HttpParams();
    params = params.append('name', query.name);
    return this.http.get<Business[]>(`${this.url}/companies/name`, { params: params });
  }

}
