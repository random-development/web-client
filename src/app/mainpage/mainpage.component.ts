import { Component, OnInit } from '@angular/core';
import { MonitorsService } from './monitors/monitors.service';
import { FiltersChange } from './filters/filters-change';
import { MetricsService } from './metrics/metrics.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(public monitorsService: MonitorsService,
              public metricService: MetricsService) { }

  ngOnInit() {
    this.monitorsService.fetch();
    this.metricService.fetch({
      numberOfMeasures: 100
    });
  }

  submit(filters: FiltersChange) {
    this.metricService.fetch({
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      measureTypes: filters.measureTypes,
      numberOfMeasures: filters.numberOfMeasures,
      resources: (filters.monitors || []).concat((filters.resources || []))
    });
  }
}
