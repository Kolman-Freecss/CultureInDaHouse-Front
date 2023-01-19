import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, tap } from 'rxjs';
import { Category, Show } from '../../models';

import { CreateShowCommand } from '../models';
import { CreateShowService } from '../services';

const image_predefined = 'https://imagen.research.google/main_gallery_images/sprouts-in-the-shape-of-text-imagen.jpg';

@Component({
  selector: 'app-create-show',
  templateUrl: './create-show.component.html'
})
export class CreateShowComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  loading = false;

  categories: Category[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get image(): string {
    return this.f["image"].value == null ? image_predefined : this.f["image"].value;
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: CreateShowService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      price: null,
      duration: [null, Validators.required],
      capacity: [null, Validators.required],
      onSaleDate: [null, Validators.required]
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
    this.service.createShow(command)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.toastr.success('Se ha creado el acto correctamente', 'Acto creado');

          this.loading = false;
        },
        error: () => {
          this.form?.enable();
          this.toastr.error('Ha ocurrido un error al crear el acto', 'Acto no creado');
          this.loading = false;
        }
      });
  }

  private getCategories() {
    this.loading = true;

    this.service.getCategories()
      .subscribe({
        next: (result) => {
          this.categories = result;

          this.f['category'].patchValue(this.categories[0]);
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al cargar las categorías', 'Categorías');
          this.loading = false;
        }
      });
  }

  private buildCommand() {
    const show = this.form?.value as Show;

    return new CreateShowCommand(show);
  }

  onReset() {
    this.submitted = false;

    this.form.reset({
      category: this.categories[0],
      price: 0,
      duration: 0,
      capacity: 0
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
