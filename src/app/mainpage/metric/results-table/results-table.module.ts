import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsTableComponent } from './results-table.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ResultsTableComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    ResultsTableComponent
  ]
})
export class ResultsTableModule { }
