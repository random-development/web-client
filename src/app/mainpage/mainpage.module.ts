import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage.component';
import { MonitorsService } from './monitors/monitors.service';
import { FiltersModule } from './filters/filters.module';
import { ResultsTableModule } from './results-table/results-table.module';
import { MetricsService } from './metrics/metrics.service';

@NgModule({
  declarations: [
    MainpageComponent
  ],
  providers: [
    MonitorsService,
    MetricsService
  ],
  imports: [
    CommonModule,
    FiltersModule,
    ResultsTableModule
  ],
  exports: [
    MainpageComponent
  ]
})
export class MainpageModule { }
