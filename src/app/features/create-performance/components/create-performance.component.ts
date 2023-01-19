import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Status } from 'src/app/shared/enums';
import { Performance, Show } from '../../models';

import { CreatePerformanceCommand } from '../models';
import { CreatePerformanceService } from '../services';

@Component({
  selector: 'app-create-performance',
  templateUrl: './create-performance.component.html'
})
export class CreatePerformanceComponent implements OnInit, OnDestroy {  
  form: FormGroup;
  submitted = false;
  loading = false;

  shows: Show[];
  status = Status;
  statusArray = Object.values(Status).filter(value => typeof value !== 'number');

  destroy$: Subject<boolean> = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get hasShowSelected(): boolean {
    return this.form.controls['idShow'].value != null;
  }  

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: CreatePerformanceService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      idShow: null,
      date: [null, Validators.required],
      time: [null, Validators.required],
      streamingURL: ['', Validators.required],
      remainingSeats: [null, Validators.required],
      status: null
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const command = this.buildCommand();
    this.form?.disable();
    this.service.createPerformance(command, this.f['idShow'].value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.toastr.success('Se ha creado la actuación correctamente', 'Actuación creada');

          this.loading = false;
        },
        error: () => {
          this.form?.enable();
          this.toastr.error('Ha ocurrido un error al crear la actuación', 'Actuación no creada');
          this.loading = false;
        }
      });
  }

  private buildCommand() {
    const performance = this.form?.value as Performance;

    return new CreatePerformanceCommand(performance);
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

  onReset() {
    this.submitted = false;

    this.form.reset({
      remainingSeats: 0,
      streamingURL: null
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
