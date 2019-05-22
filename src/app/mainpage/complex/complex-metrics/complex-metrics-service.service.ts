import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Metric } from '../../monitors/metric';
import { HTTP_HEADERS } from 'src/app/http-helpers';

@Injectable({
  providedIn: 'root'
})
export class ComplexMetricsServiceService {

  constructor(private _http: HttpClient) { }

  post(monitorName: string, resourceName: string, metric: Metric): Promise<Object> {
    const url = `monitors/${monitorName}/resources/${resourceName}/metrics`;
    return this._http.post(url, metric, HTTP_HEADERS).toPromise();
  }

  delete(monitorName: string, resourceName: string, metricName: string): Promise<Object> {
    const url = `monitors/${monitorName}/resources/${resourceName}/metrics/${metricName}`;
    return this._http.delete(url, HTTP_HEADERS).toPromise();
  }
}
