import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const CORE_MODULES = [
  FormsModule,
  CommonModule,
  BrowserModule,
  ReactiveFormsModule
];

@NgModule({
  imports: CORE_MODULES,
  exports: CORE_MODULES,
  providers: [DatePipe]
})
export class CoreModule { }
