import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MetricValues } from './metric-values';
import { HTTP_HEADERS } from 'src/app/http-helpers';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private _state$ = new BehaviorSubject<MetricValues[]>(undefined);
  private _loading$ = new BehaviorSubject(undefined);

  metrics$ = this._state$.asObservable();
  loading$ = this._loading$.asObservable();

  constructor(private _http: HttpClient) { }

  public fetch(): void {
    this._loading$.next(true);
    const url = environment.baseUrl + '/metrics?resources=monitor1:resource1,monitor1:resource2,monitor2,monitor3:resource1& ' +
    'from=12345678&to=12345890&resourceName=zeus&type=cpu';
    this._http.get<MetricValues[]>(url, HTTP_HEADERS).subscribe(data => {
      this._state$.next(data);
      this._loading$.next(false);
    });
  }
}
