import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsTableComponent } from './results-table.component';
import { ChartsModule } from 'ng2-charts';
import { FilterPipe } from '../pipe/pipe.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResultsTableComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ],
  exports: [
    ResultsTableComponent
  ]
})
export class ResultsTableModule { }
