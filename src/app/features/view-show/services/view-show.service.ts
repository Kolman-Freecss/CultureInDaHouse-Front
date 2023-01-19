import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Show, Comment } from '../../models';
import { CreateShowCommentCommand } from '../models';
import { Category } from '../../create-category/models';

@Injectable({
   providedIn: 'root',
})
export class ViewShowService {
   private url = environment.apiUrl;

   constructor(private http: HttpClient) {}

   getAllShows(): Observable<Show[]> {
      return this.http.get<Show[]>(`${this.url}/shows`);
   }

   createComment(command: CreateShowCommentCommand, idShow: number) {
      return this.http.post(`${this.url}/shows/${idShow}/comment`, command);
   }

   getComments(idShow: number): Observable<Comment[]> {
      return this.http.get<Comment[]>(`${this.url}/shows/${idShow}/comments`);
   }

   getStartDate(showId: number | null): Observable<Date | null> {
      return this.http.get<Date | null>(
         `${this.url}/shows/${showId}/startDate`,
      );
   }

   getFinalDate(showId: number | null): Observable<Date | null> {
      return this.http.get<Date | null>(
         `${this.url}/shows/${showId}/finalDate`,
      );
   }

   getCategory(showId: number | null): Observable<Category> {
      return this.http.get<Category>(`${this.url}/shows/${showId}/category`);
   }

   getShowState(showId: number | null): Observable<string> {
      return this.http.get<string>(`${this.url}/shows/${showId}/status`);
   }
}
