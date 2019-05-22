import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors/monitors.service';
import { MetricsService } from './metric-values/metrics.service';
import { FiltersChange } from './filters/filters-change';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent {

  constructor(public monitorsService: MonitorsService,
    public metricService: MetricsService) { }

  submit(filters: FiltersChange) {
    const groupsByMonitor = {};
    (filters.monitors || []).forEach(monitor => {
      groupsByMonitor[monitor] = [];
    });
    (filters.resources || []).forEach(resource => {
      groupsByMonitor[resource.monitorName].push(resource.name);
    });
    const resourcesPaths = Object.keys(groupsByMonitor).map(k => {
      return groupsByMonitor[k].length === 0 ? k : (k + ':' + groupsByMonitor[k].join(':'));
    });
    this.metricService.fetch({
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      measureTypes: filters.measureTypes,
      numberOfMeasures: filters.numberOfMeasures,
      resourcesPaths: resourcesPaths
    });
  }
}
