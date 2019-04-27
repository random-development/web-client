import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricsService } from '../metrics/metrics.service';
import { MetricValues } from '../metrics/metric-values';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {

  metrics$: Observable<MetricValues[]> = this._metricService.metrics$;

  constructor(private _metricService: MetricsService) {
  }

  ngOnInit(): void {
    this._metricService.fetch();
  }
}
