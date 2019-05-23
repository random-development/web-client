import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors/monitors.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MetricExtended } from './metric-extended';
import { CreateMetric } from './manage/create-metric';
import { WriteMetricsService } from './write-metrics/write-metrics.service';
import { DeleteMetric } from './list/delete-metric';

@Component({
  selector: 'app-complex',
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss']
})
export class ComplexComponent implements OnInit {

  metrics$: Observable<MetricExtended[]> = this._monitorsService.monitors$.pipe(
    map(monitors => {
      const mapped: MetricExtended[] = [];
      monitors.forEach(monitor => {
        monitor.resources.forEach(resource => {
          resource.metrics.forEach(metric => {
            mapped.push({
              monitorName: monitor.name,
              resourceName: resource.name,
              ...metric
            });
          });
        });
      });
      return mapped;
    }),
  );

  metricsComplex$: Observable<MetricExtended[]> = this.metrics$.pipe(
    map(m => m.filter(x => x.type === 'COMPLEX'))
  );

  loading$ = this._monitorsService.loading$;

  constructor(private _monitorsService: MonitorsService,
              private _metricsService: WriteMetricsService) { }

  ngOnInit() {
  }

  createMetric(event: CreateMetric) {
    this._metricsService.post(event.monitor, event.resource, {
      name: event.name,
      interval: event.interval,
      period: event.period,
      sourceMetric: event.metric,
      type: 'COMPLEX',
      userId: ''
    }).then(() => {
      this._monitorsService.fetch();
    });
  }

  deleteMetric(event: DeleteMetric) {
    this._metricsService.delete(event.monitor, event.resource, event.metric).then(() => {
      this._monitorsService.fetch();
    });
  }

}
