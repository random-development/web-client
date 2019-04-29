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
    const groupsByMonitor = {};
    (filters.monitors || []).forEach(monitor => {
      groupsByMonitor[monitor] = [];
    });
    (filters.resources || []).forEach(r => {
      const splittedVirtualId = r.split(':');
      const monitor = splittedVirtualId[0];
      const resource = splittedVirtualId[1];
      groupsByMonitor[monitor].push(resource);
    });
    const resources = Object.keys(groupsByMonitor).map(k => {
      return groupsByMonitor[k].length === 0 ? k : (k + ':' + groupsByMonitor[k].join(':') );
    });
    this.metricService.fetch({
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      measureTypes: filters.measureTypes,
      numberOfMeasures: filters.numberOfMeasures,
      resources: resources
    });
  }
}
