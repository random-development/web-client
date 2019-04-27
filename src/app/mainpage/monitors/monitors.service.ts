import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monitor } from './monitor';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HTTP_HEADERS } from 'src/app/http-helpers';

@Injectable()
export class MonitorsService {

  private _state$ = new BehaviorSubject<Monitor[]>(undefined);

  monitors$ = this._state$.asObservable();

  constructor(private _http: HttpClient) { }

  public fetch(): void {
    const url = environment.baseUrl + '/monitors';
    this._http.get<Monitor[]>(url, HTTP_HEADERS).subscribe(data => {
      this._state$.next(data);
    });
  }
}
