import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Monitor } from './entities/monitor';
import { environment } from '../../environments/environment';
import { BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class MonitorsService {

  private _state$ = new BehaviorSubject<Monitor[]>(undefined);
  private readonly _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  monitors$ = this._state$.asObservable();

  constructor(private _http: HttpClient) { }

  public fetch(): void {
    const url = environment.baseUrl + '/monitors';
    this._http.get<Monitor[]>(url, this._httpOptions).subscribe(data => {
      this._state$.next(data);
    });
  }

  public fetchMock(): void {
    const t = timer(1000).pipe(
      take(1)
    );
    t.subscribe(d => {
      this._state$.next([
        {
          name: 'mock monitor #1'
        },
        {
          name: 'mock monitor #2'
        }
      ]);
    });
  }
}
