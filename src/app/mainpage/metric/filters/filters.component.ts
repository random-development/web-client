import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject, combineLatest, BehaviorSubject, interval, Subscription } from 'rxjs';
import { Monitor } from '../../monitors/monitor';
import { Resource } from '../../monitors/resource';
import { Metric } from '../../monitors/metric';
import { FiltersChange } from './filters-change';
import { ResourceExtended } from './resource-extended';
import { MetricRefreshService } from '../metric-refresh.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  private _selectedMonitors$ = new BehaviorSubject<string[]>([]);
  private _selectedResources$ = new BehaviorSubject<ResourceExtended[]>([]);
  private _autorefreshInterval: Observable<number> = interval(5000).pipe(
    takeUntil(this._destroyed$)
  );
  private _intervalSubscription: Subscription;

  @Input()
  monitors: Monitor[];

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
      'autorefresh': [false]
    }
  );
  availableResources$: Observable<ResourceExtended[]>;
  availableMeasureTypes$: Observable<string[]>;

  get autoRefresh() {
    return this.formFilters.get('autorefresh');
  }

  constructor(private _fb: FormBuilder, private metricRefreshService: MetricRefreshService) {}

  ngOnInit() {
    const monitorsSelect = this.formFilters.get('monitors');
    const resourcesSelect = this.formFilters.get('resources');
    const measureTypesSelect = this.formFilters.get('measureTypes');

    monitorsSelect.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(values => {
      this._selectedMonitors$.next(values);
      resourcesSelect.setValue([]);
      measureTypesSelect.setValue([]);
      values.length > 0 ? resourcesSelect.enable() : resourcesSelect.disable();
      measureTypesSelect.disable();
    });

    resourcesSelect.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(values => {
      this._selectedResources$.next(values);
      measureTypesSelect.setValue([]);
      values.length > 0 ? measureTypesSelect.enable() : measureTypesSelect.disable();
    });

    this.autoRefresh.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(value => {
      if (value) {
        this._intervalSubscription = this._autorefreshInterval.pipe(
          takeUntil(this._destroyed$)
        ).subscribe(x => {
          this.submit();
        });
      } else {
        this._intervalSubscription.unsubscribe();
      }
    });

    this.availableResources$ = this._selectedMonitors$.pipe(
      map(selectedMonitors => this.monitors.filter(monitor => selectedMonitors.includes(monitor.name))),
      map(this.mapToResource)
    );

    this.availableMeasureTypes$ = combineLatest(
      this.availableResources$,
      this._selectedResources$
    ).pipe(
      map(([resources, selectedResources]) => resources
        .filter(resource => (selectedResources || [])
                              .some(selectedResource => selectedResource.name === resource.name)
                )),
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

    this.metricRefreshService.refresh();
  }

  private convertDate(date: any): Date {
    return date && new Date(`${date.year}-${date.month}-${date.day}`);
  }

  private mapToResource(monitors: Monitor[]): ResourceExtended[] {
    return (monitors || [])
    .map(monitor => monitor.resources.map(r => ({ ...r, monitorName: monitor.name, label: `${r.name} (${monitor.name})` })))
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
