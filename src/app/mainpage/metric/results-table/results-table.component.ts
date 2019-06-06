import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricValues } from '../metric-values/metric-values';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import {ExcelService} from '../excel-export/excel.service';
import * as moment from 'moment';
import { MetricRefreshService } from '../metric-refresh.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent {
  closeResult: string;
  modalContent: any[];
  filterMetrics: string;
  public chartType = 'line';
  @Input()
  metrics: MetricValues[];
  content: any;

  constructor(private modalService: NgbModal, private excelService: ExcelService, private metricRefreshService: MetricRefreshService) {
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    fill: false,
    scales: {
      xAxes: [{
        type: 'time'
      }]
    }
  };
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];
  public metricsForChart = [];
  public metricTableData = [];
  public dataset = [];
  public metricDataset = [];

  checkboxChanged(metric) {
    if (metric.isChecked === true) {
      metric.isChecked = false;
    } else {
      metric.isChecked = true;
    }
  }

  rowSelected(content, metric) {
    this.metricTableData = [];
    for (const i in metric.timeData) {
      if (true) {
        this.metricTableData.push(
          {id: i, time: metric.timeData[i], value: metric.valueData[i]}
        );
      }
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  open(content?) {
    if (content) {
      this.content = content;
      this.metricRefreshService.resultsComponent = this;
    }

    this.metricsForChart = this.metrics.filter(m => m.isChecked === true);
    this.barChartLabels = [];
    this.barChartData = [];
    this.modalContent = this.metricsForChart;
    if (this.metricsForChart.length > 0) {
      this.metricsForChart.forEach(metric => {
        this.metricDataset = [];
        for (const i in metric.timeData) {
          if (true) {
            this.metricDataset.push(
              { x: moment.unix(metric.timeData[i]).format("YYYY-MM-DD HH:mm:ss"), y: metric.valueData[i] }
            );
          }
        }
        console.log(this.metricDataset);
        this.barChartData.push(
          {
            data: this.metricDataset,
            label: (metric.name + ':' + metric.resourceName + ':' + metric.type),
            fill: 'false',
            lineTension: 0.3
          }
        );
      });
      // this.modalService.dismissAll();
      if (content) {
        this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'modalWindow'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.metricRefreshService.resultsComponent = null;
        }, (reason) => {
          this.closeResult = `Dismissed`;
        });
      }
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.metrics.map(function(x){
      return {
        HostName: x.resourceName,
        MonitorName: x.name,
        MeasureType: x.type,
        Value: x.lastValue,
        Time: x.time
      };
    }), 'metrics');
  }
}
