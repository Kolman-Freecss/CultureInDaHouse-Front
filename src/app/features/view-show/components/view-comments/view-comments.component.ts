import { Component, Input } from '@angular/core';
import { ViewShowService } from '../../services';
import { Comment } from '../../../models';

@Component({
   selector: 'app-view-comments',
   templateUrl: 'view-comments.component.html',
})
export class ViewCommentsComponent {
   @Input() show: number;

   loading: boolean;
   comments: Comment[];

   constructor(private service: ViewShowService) {}

   private getComments() {
      this.loading = true;

      this.service.getComments(this.show).subscribe({
         next: (result) => {
            this.comments = result;
            this.loading = false;
         },
         error: () => {
            this.loading = false;
         },
      });
   }

   // Obtiene la media de las puntuaciones de todos los comentarios
   public getMeanRating() {
      let sum = 0;
      this.comments.forEach((comment) => {
         sum += comment.rating;
      });
      return sum / this.comments.length;
   }

   ngOnInit() {
      this.getComments();
   }
}
