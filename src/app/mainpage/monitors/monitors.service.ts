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

  monitors$: Observable<Monitor[]> = this._state$.asObservable();

  loading$: Observable<boolean> = this._state$.pipe(
    map(monitors => monitors === undefined)
  );

  constructor(private _http: HttpClient) { }

  public fetch(): void {
    const url = environment.baseUrl + '/monitors';
    this._http.get<Monitor[]>(url, HTTP_HEADERS).subscribe(data => {
      this._state$.next(
        [...data,
        {//add mock
          name: 'Mock',
          resources: [
            {
              name: 'rmock',
              metrics: [{ name: 'testm', type: 'COMPLEX', period: 1, interval: 1 }]
            }]
        }]);
    });
  }
}
