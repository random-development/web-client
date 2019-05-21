import { Metric } from './metric';

export interface Resource {
  name: string;
  metrics: Metric[];
}
