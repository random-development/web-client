import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexComponent } from './complex.component';
import { ListModule } from './list/list.module';
import { ManageModule } from './manage/manage.module';

@NgModule({
  declarations: [ComplexComponent],
  imports: [
    CommonModule,
    ListModule,
    ManageModule
  ],
  exports: [
    ComplexComponent
  ]
})
export class ComplexModule { }
