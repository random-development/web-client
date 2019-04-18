import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Monitor } from './shared/monitor';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MonitorsService {

  private _state$ = new BehaviorSubject<Monitor[]>([]);
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
}
