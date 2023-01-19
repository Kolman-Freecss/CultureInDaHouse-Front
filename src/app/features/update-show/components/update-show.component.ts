import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Category, Show } from '../../models';

import { UpdateShowService } from '../services';

const image_predefined = 'https://imagen.research.google/main_gallery_images/sprouts-in-the-shape-of-text-imagen.jpg';

@Component({
  selector: 'app-update-show',
  templateUrl: './update-show.component.html'
})
export class UpdateShowComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  loading = false;
  load: boolean;

  categories: Category[] = [];
  shows: Show[] | null = null;
  show: number | null = null;

  destroy$: Subject<boolean> = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get image(): string {
    return this.f["image"].value == null ? image_predefined : this.f["image"].value;
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: UpdateShowService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: null,
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

  cambiarShow(show: number | null) {
    this.show = null;
    this.load = false;
    setTimeout(() => {
      this.show = show;
      this.getShowDetails();
    }, 500);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const command = this.buildCommand();
    this.service.updateShow(command)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.toastr.success('Se ha actualizado el acto correctamente', 'Acto actualizado');

          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al actualizar el acto', 'Acto no actualizado');
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
    show.id = this.show as number;
    show.categoryId = this.f['category'].value.id;
    return show;
  }

  private getAllShows() {
    this.loading = true;

    this.service.getAllShows()
      .subscribe({
        next: (result: Show[]) => {
          this.shows = result;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  private getShowDetails() {
    this.loading = true;

    this.service.getShowDetails(this.show)
      .subscribe({
        next: (result: Show) => {
          this.form.reset(result);

          const category = this.categories.filter(i => i.id === result.category.id)[0];
          this.form.controls['category'].patchValue(category);

          this.loading = false;
          this.load = true;
        },
        error: () => {
          this.loading = false;
        }
      });
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
    this.getAllShows();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
