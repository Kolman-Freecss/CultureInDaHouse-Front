import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Business } from "../../models";
import { Subject, takeUntil, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { SearchBusinessService } from "../services";
import { Status } from 'src/app/shared/enums';

@Component({
  selector: 'app-search-business',
  templateUrl: './search-business.component.html',
  styleUrls: ['./search-business.component.scss']
})
export class SearchBusinessComponent implements OnDestroy{

  form: FormGroup;
  submitted = false;
  loading = false;
  status = Status;

  business: Business[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: SearchBusinessService) {
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

    this.service.searchBusinessByName(this.form?.value)
      .pipe(tap(() => {
        this.loading = true;
      }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (business: Business[]) => {
          this.business = business;
          this.loading = false;
        },
        error: () => {
          this.form?.enable();
          this.toastr.error('Ha ocurrido un error al buscar empresas', 'Error en búsqueda');
          this.loading = false;
        }
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
