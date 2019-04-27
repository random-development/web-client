import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MonitorsService } from '../monitors/monitors.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { MetricsService } from '../metrics/metrics.service';
import { Monitor } from '../monitors/monitor';
import { Resource } from '../monitors/Resource';
import { Metric } from '../monitors/Metric';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  private _selectedMonitors$ = new BehaviorSubject([]);
  private _selectedResources$ = new BehaviorSubject([]);

  loading$: Observable<boolean> = this._monitorService.monitors$.pipe(
    map(monitors => monitors === undefined)
  );

  formFilters: FormGroup = this._fb.group(
    {
      'numberOfMeasures': [100],
      'datetimeFrom': [],
      'datetimeTo': [],
      'monitors': [],
      'resources': [],
      'measureTypes': [],
    }
  );

  monitors$ = this._monitorService.monitors$.pipe(
    map(monitors => monitors.map(monitor => monitor.name))
  );

  private _availableResources$: Observable<Resource[]> = combineLatest(
    this._monitorService.monitors$,
    this._selectedMonitors$
  ).pipe(
    map(([monitors, selectedMonitors]) => monitors.filter(monitor => selectedMonitors.includes(monitor.name))),
    map(this._mapToResource)
  );

  availableResourcesNames$: Observable<string[]> = this._availableResources$.pipe(
    map(resources => resources.map(resource => resource.name))
  );

  availableMeasureTypes$: Observable<string[]> = combineLatest(
    this._availableResources$,
    this._selectedResources$
  ).pipe(
    map(([resources, selectedResources]) => resources.filter(resource => selectedResources.includes(resource.name))),
    map(this._mapToMetric),
    map(metrics => metrics.map(metric => metric.name)),
    map(metricNames => {
      const distinctNames = new Set(metricNames);
      return Array.from(distinctNames);
    })
  );

  constructor(private _fb: FormBuilder,
              private _monitorService: MonitorsService,
              private _metricService: MetricsService) {
              }

  ngOnInit() {
    this._monitorService.fetch();
    const monitorsSelect = this.formFilters.get('monitors');
    const resourcesSelect = this.formFilters.get('resources');
    const measureTypesSelect = this.formFilters.get('measureTypes');

    monitorsSelect.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(values => {
      this._selectedMonitors$.next(values);
      resourcesSelect.setValue('');
      measureTypesSelect.setValue('');
    });

    resourcesSelect.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(values => {
      console.log('res select' + values);
      this._selectedResources$.next(values);
      measureTypesSelect.setValue('');
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

  submit() {
    this._metricService.fetch();
  }

  private _mapToResource(monitors: Monitor[]): Resource[] {
    return (monitors || [])
        .map(monitor => monitor.resources.map(r => r))
        .reduce((resourcesAcc, resources) => {
          resourcesAcc.push(...resources);
          return resourcesAcc;
        }, []);
    }

  private _mapToMetric(resources: Resource[]): Metric[] {
    return (resources || [])
      .map(resource => resource.metrics.map(m => m))
      .reduce((measureTypeAcc, measureTypes) => {
        measureTypeAcc.push(...measureTypes);
        return measureTypeAcc;
      }, []);
  }
}
