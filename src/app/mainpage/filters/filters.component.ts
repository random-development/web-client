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
      const resources = [];
      if (monitors) {
        monitors.forEach(monitor => {
          resources.push(...monitor.resources.map(resource => resource.name));
        });
      }
      return resources;
    })
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
