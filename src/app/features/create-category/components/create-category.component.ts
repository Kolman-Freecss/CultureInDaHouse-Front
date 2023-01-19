import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, tap } from 'rxjs';

import { Category, CreateCategoryCommand } from '../models';
import { CreateCategoryService } from '../services';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html'
})
export class CreateCategoryComponent implements OnDestroy {
  form: FormGroup;
  submitted = false;
  loading = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: CreateCategoryService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const command = this.buildCommand();

    this.service.createCategory(command)
      .pipe(tap(() => {
        this.form?.disable();
      }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.toastr.success('Se ha creado la categoría correctamente', 'Categoría creada');

          this.loading = false;
        },
        error: () => {
          this.form?.enable();
          this.toastr.error('Ha ocurrido un error al crear la categoría', 'Categoría no creada');
          this.loading = false;
        }
      });
  }

  private buildCommand() {
    const category = this.form?.value as Category;

    return new CreateCategoryCommand(category);
  }

  onReset() {
    this.submitted = false;

    this.form.reset({
      name: null,
      description: null
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
