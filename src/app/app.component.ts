import { Component, OnInit } from '@angular/core';
import { MonitorsService } from './monitors.service';
import { Observable } from 'rxjs';
import { Monitor } from './shared/monitor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-client';

  monitors: Observable<Monitor[]> = this._monitorService.monitors$;

  constructor(private _monitorService: MonitorsService) {
  }

  ngOnInit(): void {
    this._monitorService.fetch();
  }
}
