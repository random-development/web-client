import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MetricValues } from './metric-values';
import { HTTP_HEADERS } from 'src/app/http-helpers';
import { MetricFilters } from './metric-filters';

@Injectable()
export class MetricsService {
  private _state$ = new BehaviorSubject<MetricValues[]>(undefined);
  private _loading$ = new BehaviorSubject<boolean>(undefined);

  metrics$: Observable<MetricValues[]> = this._state$.asObservable();
  loading$: Observable<boolean> = this._loading$.asObservable();

  constructor(private _http: HttpClient) { }

  public fetch(filters: MetricFilters = null): void {
    this._loading$.next(true);
    const httpParams = this.buildUrlParams(filters);
    const url = environment.baseUrl + '/metrics';
    this._http.get<MetricValues[]>(url, {
      ...HTTP_HEADERS,
      params: httpParams })
      .subscribe(data => {
      this._state$.next(data);
      this._loading$.next(false);
    });
  }

  private buildUrlParams(filters: MetricFilters = null): HttpParams {
    const convertToUnixTimestamp = (date: Date) => date.getTime() / 1000;
    let params = new HttpParams();
    if (filters == null) {
      return params;
    }
    if (filters.dateFrom) {
      params = params.append('from', '' + convertToUnixTimestamp(filters.dateFrom));
    }
    if (filters.dateTo) {
      params = params.append('to', '' + convertToUnixTimestamp(filters.dateTo));
    }
    if (filters.measureTypes && filters.measureTypes.length) {
      params = params.append('type', filters.measureTypes.join(','));
    }
    if (filters.numberOfMeasures) {
      params = params.append('limit', '' + filters.numberOfMeasures);
    }
    if (filters.resourcesPaths && filters.resourcesPaths.length) {
      params = params.append('resources', filters.resourcesPaths.join(','));
    }
    return params;
  }
}
