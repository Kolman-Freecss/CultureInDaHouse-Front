import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, tap } from 'rxjs';
import { Show } from 'src/app/features/models';

import { Status } from 'src/app/shared/enums';
import { UpdatehowService } from '../services';

@Component({
  selector: 'app-update-show',
  templateUrl: './update-show.component.html'
})
export class UpdateShowComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  loading = false;

  status = Status;
  statusArray = Object.values(Status).filter(value => typeof value !== 'number');

  shows: Show[];

  destroy$: Subject<boolean> = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: UpdatehowService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      status: [null, Validators.required],
      id: [null, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const show = this.form?.value as Show;

    this.service.updateShow(show)
      .pipe(tap(() => {
        this.form?.disable();
        this.loading = true;
      }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.toastr.success('Se ha actualizado el acto correctamente', 'Acto actualizado');

          this.loading = false;
        },
        error: () => {
          this.form?.enable();
          this.toastr.error('Ha ocurrido un error al actualizar el acto', 'Acto no actualizado');
          this.loading = false;
        }
      });
  }

  private getAllShows() {
    this.loading = true;

    this.service.getAllShows()
      .subscribe({
        next: (result) => {
          this.shows = result;
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al cargar los actos', 'Actos');
          this.loading = false;
        }
      });
  }

  ngOnInit() {
    this.getAllShows();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
