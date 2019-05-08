export interface MetricValues {
    name: string;
    resourceName: string;
    type: string;
    lastValue: number;
    time: number;
    timeData: number[];
    valueData: number[];
}
