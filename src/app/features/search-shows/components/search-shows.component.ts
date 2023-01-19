import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, tap } from 'rxjs';
import { Status } from 'src/app/shared/enums';
import { Category, Show } from '../../models';

import { SearchShowsService } from '../services';

@Component({
  selector: 'app-search-shows',
  templateUrl: './search-shows.component.html'
})
export class SearchShowsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  loading = false;
  status = Status;
  statusArray = Object.values(Status).filter(value => typeof value !== 'number');

  shows: Show[] = [];
  categories: Category[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: SearchShowsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: null,
      category: null,
      onSaleDate: null,
      status: null
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.service.searchShows(this.form?.value)
      .pipe(tap(() => {
        this.loading = true;
      }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (shows: Show[]) => {
          this.shows = shows;
          this.loading = false;
        },
        error: () => {
          this.form?.enable();
          this.toastr.error('Ha ocurrido un error al buscar actos', 'Error en búsqueda');
          this.loading = false;
        }
      });
  }

  onReset() {
    this.submitted = false;

    this.form.reset({
      name: null,
      category: null,
      onSaleDate: null,
      status: null
    });
  }

  private getCategories() {
    this.loading = true;

    this.service.getCategories()
      .subscribe({
        next: (result) => {
          this.categories = result;
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al cargar las categorías', 'Categorías');
          this.loading = false;
        }
      });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
