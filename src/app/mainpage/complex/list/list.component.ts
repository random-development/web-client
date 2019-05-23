import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Metric } from '../../monitors/metric';
import { MetricExtended } from '../metric-extended';
import { DeleteMetric } from './delete-metric';

@Component({
  selector: 'app-complex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  metrics: MetricExtended[];

  @Output()
  delete = new EventEmitter<DeleteMetric>();

  constructor() { }

  ngOnInit() {
  }

  remove(monitor: string, resource: string, metric: string) {
    this.delete.emit({
      monitor,
      resource,
      metric
    });
  }

}
