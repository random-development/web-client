import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MonitorsService } from '../monitors/monitors.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  resources$: Observable<string[]> = this.monitorService.monitors$.pipe(
    map(monitors => {
      return (monitors || [])
        .map(monitor => monitor.resources.map(r => r.name))
        .reduce((resourcesAcc, resources) => {
          resourcesAcc.push(...resources);
          return resourcesAcc;
        }, []);
    })
  );

  loading$: Observable<boolean> = this.monitorService.monitors$.pipe(
    map(monitors => monitors === undefined)
  );

  formFilters = this._fb.group(
    {
      'numberOfMeasures': [100],
      'datetimeFrom': [],
      'datetimeTo': [],
      'monitors': [],
      'resources': []
    }
  );

  constructor(private _fb: FormBuilder,
              public monitorService: MonitorsService) { }

  ngOnInit() {
    this.monitorService.fetch();
  }

  submit() {
    alert('submit ' + this.formFilters.get('numberOfMeasures').value);
  }

}
