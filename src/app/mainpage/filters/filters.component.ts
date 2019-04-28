import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { Monitor } from '../monitors/monitor';
import { Resource } from '../monitors/Resource';
import { Metric } from '../monitors/Metric';
import { FiltersChange } from './filters-change';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  private _selectedMonitors$ = new BehaviorSubject([]);
  private _selectedResources$ = new BehaviorSubject([]);
  private _availableResources$: Observable<Resource[]>;

  @Input()
  monitors$: Observable<Monitor[]>;

  @Output()
  filterChange: EventEmitter<FiltersChange> = new EventEmitter();

  formFilters: FormGroup = this._fb.group(
    {
      'numberOfMeasures': [100],
      'dateFrom': [],
      'dateTo': [],
      'monitors': [],
      'resources': [{value: null, disabled: true}],
      'measureTypes': [{value: null, disabled: true}],
    }
  );
  monitorsNames$: Observable<string[]>;
  availableResourcesNames$: Observable<string[]>;
  availableMeasureTypes$: Observable<string[]>;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    const monitorsSelect = this.formFilters.get('monitors');
    const resourcesSelect = this.formFilters.get('resources');
    const measureTypesSelect = this.formFilters.get('measureTypes');

    monitorsSelect.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(values => {
      this._selectedMonitors$.next(values);
      resourcesSelect.setValue('');
      measureTypesSelect.setValue('');
      values.length > 0 ? resourcesSelect.enable() : resourcesSelect.disable();
      measureTypesSelect.disable();
    });

    resourcesSelect.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(values => {
      this._selectedResources$.next(values);
      measureTypesSelect.setValue('');
      values.length > 0 ? measureTypesSelect.enable() : measureTypesSelect.disable();
    });

    this._availableResources$ = combineLatest(
      this.monitors$,
      this._selectedMonitors$
    ).pipe(
      map(([monitors, selectedMonitors]) => monitors.filter(monitor => selectedMonitors.includes(monitor.name))),
      map(this.mapToResource)
    );

    this.monitorsNames$ = this.monitors$.pipe(
      map(monitors => monitors.map(monitor => monitor.name))
    );

    this.availableResourcesNames$ = this._availableResources$.pipe(
      map(resources => resources.map(resource => resource.name))
    );

    this.availableMeasureTypes$ = combineLatest(
      this._availableResources$,
      this._selectedResources$
    ).pipe(
      map(([resources, selectedResources]) => resources.filter(resource => selectedResources.includes(resource.name))),
      map(this.mapToMetric),
      map(metrics => metrics.map(metric => metric.name)),
      map(metricNames => {
        const distinctNames = new Set(metricNames);
        return Array.from(distinctNames);
      })
    );
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

  submit() {
    this.filterChange.emit({
      dateFrom: this.convertDate(this.formFilters.get('dateFrom').value),
      dateTo: this.convertDate(this.formFilters.get('dateTo').value),
      measureTypes: this.formFilters.get('measureTypes').value,
      monitors: this.formFilters.get('monitors').value,
      numberOfMeasures: this.formFilters.get('numberOfMeasures').value,
      resources: this.formFilters.get('resources').value
    });
  }

  private convertDate(date: any): Date {
    return date && new Date(`${date.year}-${date.month}-${date.day}`);
  }

  private mapToResource(monitors: Monitor[]): Resource[] {
    return (monitors || [])
        .map(monitor => monitor.resources.map(r => r))
        .reduce((resourcesAcc, resources) => {
          resourcesAcc.push(...resources);
          return resourcesAcc;
        }, []);
    }

  private mapToMetric(resources: Resource[]): Metric[] {
    return (resources || [])
      .map(resource => resource.metrics.map(m => m))
      .reduce((measureTypeAcc, measureTypes) => {
        measureTypeAcc.push(...measureTypes);
        return measureTypeAcc;
      }, []);
  }
}
