import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage.component';
import { MonitorsService } from './monitors.service';
import { FiltersModule } from './filters/filters.module';
import { ResultsTableModule } from './results-table/results-table.module';

@NgModule({
  declarations: [
    MainpageComponent
  ],
  providers: [
    MonitorsService
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
