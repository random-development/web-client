import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexComponent } from './complex.component';

@NgModule({
  declarations: [ComplexComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ComplexComponent
  ]
})
export class ComplexModule { }
