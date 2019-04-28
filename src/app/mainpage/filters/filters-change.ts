export interface FiltersChange {
  numberOfMeasures: number;
  dateFrom: Date;
  dateTo: Date;
  monitors: string[];
  resources: string[];
  measureTypes: string[];
}
