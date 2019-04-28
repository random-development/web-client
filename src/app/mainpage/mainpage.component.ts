import { Component, OnInit } from '@angular/core';
import { MonitorsService } from './monitors/monitors.service';
import { FiltersChange } from './filters/filters-change';
import { MetricsService } from './metrics/metrics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  loadingMonitors$: Observable<boolean> = this.monitorsService.loading$;
  loadingMetrics$: Observable<boolean> = this.metricService.loading$;

  constructor(public monitorsService: MonitorsService,
              public metricService: MetricsService) { }

  ngOnInit() {
    this.monitorsService.fetch();
    this.metricService.fetch();
  }

  submit(filters: FiltersChange) {
    console.log('submit filters');
    console.dir(filters);
    this.metricService.fetch();
  }
}
