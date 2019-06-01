import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricValues } from '../metric-values/metric-values';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent {
  closeResult: string;
  modalContent: any[];
  public chartType = 'line';
  @Input()
  metrics: MetricValues[];

  constructor(private modalService: NgbModal) {
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    fill: false
  };
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];
  public timestampsConverted = [];
  public metricsForChart = [];

  checkboxChanged(metric) {
    if (metric.isChecked == true) {
      metric.isChecked = false;
      console.log(metric.isChecked);
    }
    else {
      metric.isChecked = true;
      console.log(metric.isChecked);
    }
  }

  open(content, metrics) {
    this.metricsForChart = metrics.filter(m => m.isChecked == true);
    this.barChartLabels = [];
    this.barChartData = [];
    this.timestampsConverted = [];
    this.modalContent = this.metricsForChart;
    if (this.metricsForChart.length > 0) {
      this.metricsForChart[0].timeData.forEach(element => {
        this.timestampsConverted.push(new Date(element * 1000).toLocaleTimeString(
          [],
          {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }
        ));
      });
      this.barChartLabels = this.timestampsConverted;

      this.metricsForChart.forEach(metric => {
        this.barChartData.push(
          {data: metric.valueData, label: (metric.resourceName + ':' + metric.name), fill: 'false'}
        );
      });
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed`;
      });
    }
  }
}
