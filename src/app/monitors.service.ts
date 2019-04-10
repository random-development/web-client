import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Monitor } from './shared/monitor';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class MonitorsService {

  private readonly _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private _http: HttpClient) { }

  public list(): Observable<Monitor[]> {
    const url = environment.baseUrl + '/monitors';
    return this._http.get<Monitor[]>(url, this._httpOptions);
  }
}
