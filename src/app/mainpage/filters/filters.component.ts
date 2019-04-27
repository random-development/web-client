import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MonitorsService } from '../monitors/monitors.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MetricsService } from '../metrics/metrics.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  resources$: Observable<string[]> = this._monitorService.monitors$.pipe(
    map(monitors => {
      return (monitors || [])
        .map(monitor => monitor.resources.map(r => r.name))
        .reduce((resourcesAcc, resources) => {
          resourcesAcc.push(...resources);
          return resourcesAcc;
        }, []);
    })
  );

  loading$: Observable<boolean> = this._monitorService.monitors$.pipe(
    map(monitors => monitors === undefined)
  );

  monitors$: Observable<string[]> = this._monitorService.monitors$.pipe(
    map(monitors => monitors.map(monitor => monitor.name))
  );

  formFilters = this._fb.group(
    {
      'numberOfMeasures': [100],
      'datetimeFrom': [],
      'datetimeTo': [],
      'monitors': [],
      'resources': []
    }
  );

  constructor(private _fb: FormBuilder,
              private _monitorService: MonitorsService,
              private _metricService: MetricsService) { }

  ngOnInit() {
    this._monitorService.fetch();
  }

  submit() {
    this._metricService.fetch();
  }

}
