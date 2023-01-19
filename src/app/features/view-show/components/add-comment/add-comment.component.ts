import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
   AbstractControl,
   FormBuilder,
   FormGroup,
   Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, tap } from 'rxjs';
import { CreateShowCommentCommand } from '../../models';
import { ViewShowService } from '../../services';
import { ShowComment } from '../../models/create-show-comment.command';

@Component({
   selector: 'app-add-comment',
   templateUrl: 'add-comment.component.html',
})
export class AddCommentComponent {
   @Input() show: number;
   @Output() newCommentEvent = new EventEmitter<string>();

   form: FormGroup;
   loading: boolean;
   submitted: boolean;
   isCommentActive: boolean;

   destroy$: Subject<boolean> = new Subject<boolean>();

   get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
   }

   constructor(
      private fb: FormBuilder,
      private toastr: ToastrService,
      private service: ViewShowService,
   ) {
      this.createForm();
   }

   createForm() {
      this.form = this.fb.group({
         comment: [null, Validators.required],
         rating: [null, Validators.required],
      });
   }

   onSubmit() {
      this.submitted = true;

      if (this.form.invalid) {
         return;
      }

      this.loading = true;
      const command = this.buildCommand();

      this.service.createComment(command, this.show).subscribe({
         next: () => {
            this.loading = false;
            this.form.reset({ comment: null });
            this.toastr.success(
               'Se ha creado el comentario con éxito',
               'Comentario de acto',
            );
            this.isCommentActive = false;
            this.newCommentEvent.emit();
         },
         error: () => {
            this.form?.enable();
            this.toastr.error(
               'No se ha podido crear el comentario debido a un error en el sistema',
               'Comentario de acto',
            );
            this.loading = false;
         },
      });
   }

   private buildCommand() {
      const show = this.form?.value as ShowComment;

      return new CreateShowCommentCommand(show);
   }
}
