import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monitor } from './monitor';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HTTP_HEADERS } from 'src/app/http-helpers';
import { map } from 'rxjs/operators';

@Injectable()
export class MonitorsService {

  private _state$ = new BehaviorSubject<Monitor[]>(undefined);
  private _loading$ = new BehaviorSubject<boolean>(undefined);

  monitors$: Observable<Monitor[]> = this._state$.asObservable();

  loading$ = this._loading$.asObservable();

  constructor(private _http: HttpClient) { }

  public fetch(): void {
    const url = environment.baseUrl + '/monitors';
    this._loading$.next(true);
    this._http.get<Monitor[]>(url, HTTP_HEADERS).subscribe(data => {
      this._state$.next(
        [...data,
        {// add mock
          name: 'Mock',
          resources: [
            {
              name: 'rmock',
              metrics: [{ name: 'testm', type: 'COMPLEX', period: 1, interval: 1 }]
            }]
        },
        {// add mock
          name: 'Mock2',
          resources: [
            {
              name: 'rmock2',
              metrics: [{ name: 'testm2', type: 'NORMAL', period: 2, interval: 2 }]
            }]
        }
      ]);
      this._loading$.next(false);
    });
  }
}
