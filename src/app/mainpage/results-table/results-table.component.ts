import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { Observable } from 'rxjs';
import { Monitor } from '../entities/monitor';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {

  monitors$: Observable<Monitor[]> = this._monitorService.monitors$;

  constructor(private _monitorService: MonitorsService) {
  }

  ngOnInit(): void {
    this._monitorService.fetchMock();
  }

}
