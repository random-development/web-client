export interface Metric {
  name: string;
  type: 'normal' | 'complex';
  userId?: string;
  sourceMetric?: string;
  period?: number;
  interval?: number;
}
