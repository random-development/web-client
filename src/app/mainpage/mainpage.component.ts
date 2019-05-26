import { Component, OnInit } from '@angular/core';
import { MonitorsService } from './monitors/monitors.service';
import { MetricsService } from './metric/metric-values/metrics.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private monitorsService: MonitorsService) {
  }

  ngOnInit() {
    this.monitorsService.fetch();
  }

}
