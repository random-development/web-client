import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsTableComponent } from './results-table.component';

@NgModule({
  declarations: [
    ResultsTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResultsTableComponent
  ]
})
export class ResultsTableModule { }
