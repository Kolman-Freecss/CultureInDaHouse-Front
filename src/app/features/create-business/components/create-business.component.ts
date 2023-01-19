import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, tap } from 'rxjs';
import { CreateBusinessCommand} from '../models';

import { CreateBusinessService } from '../services';
import {Business} from "../../models";

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html'
})
export class CreateBusinessComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  loading = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: CreateBusinessService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      address: null,
      email: null,
      mobileNumber: null,
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const command = this.buildCommand();

    this.service.createBusiness(command)
      .pipe(tap(() => {
        this.form?.disable();
      }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.toastr.success('Se ha creado la empresa correctamente', 'Empresa creada');

          this.loading = false;
        },
        error: () => {
          this.form?.enable();
          this.toastr.error('Ha ocurrido un error al crear la empresa', 'Empresa no creada');
          this.loading = false;
        }
      });
  }

  private buildCommand() {
    const business = this.form?.value as Business;

    return new CreateBusinessCommand(business);
  }

  onReset() {
    this.submitted = false;

    this.form.reset({
      name: null,
      address: null,
      email: null,
      mobileNumber: null,
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
