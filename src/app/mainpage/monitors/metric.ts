export interface Metric {
  name: string;
  type: 'NORMAL' | 'COMPLEX';
  userId?: string;
  sourceMetric?: string;
  period?: number;
  interval?: number;
}
