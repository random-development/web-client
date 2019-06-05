import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricValues } from '../metric-values/metric-values';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import {ExcelService} from '../excel-export/excel.service';
import * as moment from 'moment';

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

  constructor(private modalService: NgbModal, private excelService: ExcelService) {
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
  public timestampsConverted = [];
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

  open(content, metrics) {
    this.metricsForChart = metrics.filter(m => m.isChecked === true);
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
      // this.barChartLabels = this.timestampsConverted;

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
            label: (metric.resourceName + ':' + metric.name),
            fill: 'false',
            lineTension: 0.3
          }
        );
      });
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'modalWindow'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed`;
      });
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
