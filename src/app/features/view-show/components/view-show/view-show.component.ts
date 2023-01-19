import { Component } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { Category } from 'src/app/features/create-category/models';
import { Show } from 'src/app/features/models';
import { ViewShowService } from '../../services';

@Component({
   selector: 'app-view-show',
   templateUrl: './view-show.component.html',
})
export class ViewShowComponent {
   loading: boolean;
   loaded = true;

   shows: Show[];
   show: number | null = null;
   destroy$: Subject<boolean> = new Subject<boolean>();

   startDate: Date | null;
   finalDate: Date | null;
   category: Category | null;
   showState: string = '';

   constructor(private service: ViewShowService) {}

   cambiarShow(show: number | null) {
      this.show = null;
      setTimeout(() => {
         this.show = show;
         if (show) this.getShowDates();
      }, 300);
   }

   newCommentChanged() {
      this.loaded = false;
      setTimeout(() => {
         this.loaded = true;
      }, 300);
   }

   private getAllShows() {
      this.loading = true;

      this.service.getAllShows().subscribe({
         next: (result: Show[]) => {
            this.shows = result;
            this.loading = false;
         },
         error: () => {
            this.loading = false;
         },
      });
   }

   private getShowDates() {
      this.restartValues();

      const startDate$ = this.service.getStartDate(this.show);
      const finalDate$ = this.service.getFinalDate(this.show);
      const category$ = this.service.getCategory(this.show);
      const showState$ = this.service.getShowState(this.show);

      forkJoin({ startDate$, finalDate$, category$, showState$ }).subscribe(
         (data) => {
            this.startDate = data.startDate$;
            this.finalDate = data.finalDate$;
            this.category = data.category$;
            this.showState = data.showState$;
         },
      );
   }

   private restartValues() {
      this.startDate = null;
      this.finalDate = null;
      this.category = null;
      this.showState = '';
   }

   ngOnInit() {
      this.getAllShows();
   }

   ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
   }
}
