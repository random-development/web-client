import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricComponent } from './metric.component';
import { FiltersModule } from './filters/filters.module';
import { ResultsTableModule } from './results-table/results-table.module';
import { MonitorsService } from '../monitors/monitors.service';
import { MetricsService } from './metric-values/metrics.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MetricComponent],
  providers: [
    MonitorsService,
    MetricsService
  ],
  imports: [
    CommonModule,
    FiltersModule,
    ResultsTableModule,
    RouterModule
  ],
  exports: [
    MetricComponent
  ]
})
export class MetricModule { }
