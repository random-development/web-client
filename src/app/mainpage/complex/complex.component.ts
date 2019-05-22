import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors/monitors.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MetricExtended } from './metric-extended';

@Component({
  selector: 'app-complex',
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss']
})
export class ComplexComponent implements OnInit {

  complexMetrics$: Observable<MetricExtended[]> = this._monitorsService.monitors$.pipe(
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
      return mapped.filter(m => m.type === 'COMPLEX');
    }),
  );

  loading$ = this._monitorsService.loading$;

  constructor(private _monitorsService: MonitorsService) { }

  ngOnInit() {
  }

}
