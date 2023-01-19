import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Status } from '../../../shared/enums';
import { Category } from '../../models';
import { Subject, takeUntil, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SearchCategoryService } from '../services/search-category.service';

@Component({
   selector: 'app-search-category',
   templateUrl: './search-category.component.html',
   styleUrls: ['./search-category.component.scss'],
})
export class SearchCategoryComponent implements OnDestroy {
   form: FormGroup;
   submitted = false;
   loading = false;
   status = Status;

   categories: Category[] = [];

   destroy$: Subject<boolean> = new Subject<boolean>();

   get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
   }

   constructor(
      private fb: FormBuilder,
      private toastr: ToastrService,
      private service: SearchCategoryService,
   ) {
      this.createForm();
   }

   createForm() {
      this.form = this.fb.group({
         name: null,
      });
   }

   onSubmit() {
      this.submitted = true;

      if (this.form.invalid) {
         return;
      }

      this.service
         .searchCategoryByName(this.form?.value)
         .pipe(
            tap(() => {
               this.loading = true;
            }),
            takeUntil(this.destroy$),
         )
         .subscribe({
            next: (categories: Category[]) => {
               this.categories = categories;
               this.loading = false;
            },
            error: () => {
               this.form?.enable();
               this.toastr.error(
                  'Ha ocurrido un error al buscar empresas',
                  'Error en búsqueda',
               );
               this.loading = false;
            },
         });
   }

   onReset() {
      this.submitted = false;

      this.form.reset({
         name: null,
      });
   }

   ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
   }
}
