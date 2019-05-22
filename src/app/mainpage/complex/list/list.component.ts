import { Component, OnInit, Input, Output } from '@angular/core';
import { Metric } from '../../monitors/metric';
import { MetricExtended } from '../metric-extended';

@Component({
  selector: 'app-complex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  metrics: MetricExtended[];

  constructor() { }

  ngOnInit() {
  }

}
