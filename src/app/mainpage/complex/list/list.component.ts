import { Component, OnInit, Input, Output } from '@angular/core';
import { Metric } from '../../monitors/metric';

@Component({
  selector: 'app-complex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  metrics: Metric[];

  constructor() { }

  ngOnInit() {
  }

}
