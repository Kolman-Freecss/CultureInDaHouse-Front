import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../models";
import {SearchCategoryQuery} from "../model/search-category.query";

@Injectable({
  providedIn: 'root'
})
export class SearchCategoryService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  searchCategoryByName(query: SearchCategoryQuery): Observable<Category[]> {
    let params = new HttpParams();
    params = params.append('name', query.name);
    return this.http.get<Category[]>(`${this.url}/categories/name`, { params: params });
  }

}
