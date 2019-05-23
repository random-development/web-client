import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MetricExtended } from '../metric-extended';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { CreateMetric } from './create-metric';

@Component({
  selector: 'app-complex-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  private _metricsExtended$ = new BehaviorSubject<MetricExtended[]>([]);
  private _selectedMonitor$ = new BehaviorSubject<string>(undefined);
  private _selectedResource$ = new BehaviorSubject<string>(undefined);

  @Input()
  set metrics(m) {
    this._metricsExtended$.next(m);
  }

  @Output()
  create = new EventEmitter<CreateMetric>();

  monitors$: Observable<string[]> = this._metricsExtended$.pipe(
    map(metrics => {
      const monitors = metrics.map(m => m.monitorName);
      return Array.from(new Set(monitors));
    })
  );

  resources$: Observable<string[]> = combineLatest(
    this._metricsExtended$,
    this._selectedMonitor$,
    (metrics, monitor) => {
      const resources = metrics.filter(m => m.monitorName === monitor)
                               .map(m => m.resourceName);
      return Array.from(new Set(resources));
    }
  );

  metrics$: Observable<string[]> = combineLatest(
    this._metricsExtended$,
    this._selectedMonitor$,
    this._selectedResource$,
    (metrics, monitor, resource) => {
      return metrics.filter(m => m.monitorName === monitor && m.resourceName === resource)
                    .map(m => m.name);
    }
  );

  formManage = this._fb.group(
    {
      'name': this._fb.control('', Validators.required),
      'interval': this._fb.control(60, Validators.required),
      'period': this._fb.control(60, Validators.required),
      'monitor': this._fb.control(null, Validators.required),
      'resource': this._fb.control({value: null, disabled: true}, Validators.required),
      'metric': this._fb.control({value: null, disabled: true}, Validators.required)
    }
  );

  get nameInput() {
    return this.formManage.get('name');
  }
  get intervalInput() {
    return this.formManage.get('interval');
  }
  get periodrInput() {
    return this.formManage.get('period');
  }
  get resourceInput() {
    return this.formManage.get('resource');
  }
  get monitorInput() {
    return this.formManage.get('monitor');
  }
  get metricInput() {
    return this.formManage.get('metric');
  }

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.monitorInput
      .valueChanges
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe(monitor => {
        this._selectedMonitor$.next(monitor);
        if (monitor) {
          this.resourceInput.enable();
        } else {
          this.resourceInput.disable();
          this.metricInput.disable();
        }
        ['resource', 'metric'].forEach(p => {
          this.formManage.get(p).setValue(null);
        });
    });

    this.resourceInput
        .valueChanges
        .pipe(
          takeUntil(this._destroyed$)
        )
        .subscribe(resource => {
          this._selectedResource$.next(resource);
          if (resource) {
            this.metricInput.enable();
          } else {
            this.metricInput.disable();
          }
          this.formManage.get('metric').setValue(null);
        });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

  submit() {
    if (this.formManage.invalid) {
      return;
    }
    const data = this.formManage.value;
    this.create.emit(data);
  }

}
