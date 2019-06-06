import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricComponent } from './metric.component';
import { FiltersModule } from './filters/filters.module';
import { ResultsTableModule } from './results-table/results-table.module';
import { RouterModule } from '@angular/router';
import { MetricRefreshService } from './metric-refresh.service';

@NgModule({
  declarations: [MetricComponent],
  imports: [
    CommonModule,
    FiltersModule,
    ResultsTableModule,
    RouterModule
  ],
  exports: [
    MetricComponent
  ],
  providers: [MetricRefreshService]
})
export class MetricModule { }
