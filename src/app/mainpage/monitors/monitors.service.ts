import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monitor } from './monitor';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { HTTP_HEADERS } from 'src/app/http-helpers';

@Injectable()
export class MonitorsService {

  private _state$ = new BehaviorSubject<Monitor[]>(undefined);

  monitors$ = this._state$.asObservable();

  constructor(private _http: HttpClient) { }

  public fetch(): void {
    const url = environment.baseUrl + '/monitors';
    this._http.get<Monitor[]>(url, HTTP_HEADERS).subscribe(data => {
      console.dir(data);
      this._state$.next(data);
    });
  }

  public fetchMock(): void {
    const t = timer(1000).pipe(
      take(1)
    );
    t.subscribe(d => {
      this._state$.next([]);
    });
  }
}
