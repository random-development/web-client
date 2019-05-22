import { Metric } from '../monitors/metric';

export interface MetricExtended extends Metric {
  monitorName: string;
  resourceName: string;
}
