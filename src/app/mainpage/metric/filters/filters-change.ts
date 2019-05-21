import { ResourceExtended } from './resource-extended';

export interface FiltersChange {
  numberOfMeasures: number;
  dateFrom: Date;
  dateTo: Date;
  monitors: string[];
  resources: ResourceExtended[];
  measureTypes: string[];
}
