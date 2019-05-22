import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors/monitors.service';
import { map } from 'rxjs/operators';
import { flatMap } from 'lodash';
import { Metric } from '../monitors/metric';
import { Observable } from 'rxjs';
import { Resource } from '../monitors/resource';

@Component({
  selector: 'app-complex',
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss']
})
export class ComplexComponent implements OnInit {

  complexMetrics$: Observable<Metric[]> = this._monitorsService.monitors$.pipe(
    map(monitors => {
       const resources: Resource[] = flatMap(monitors, m => m.resources);
       const metrics: Metric[] = flatMap(resources, r => r.metrics);
       return metrics.filter(m => m.type === 'COMPLEX');
      })
  );

  loading$ = this._monitorsService.loading$;

  constructor(private _monitorsService: MonitorsService) { }

  ngOnInit() {
  }

}
