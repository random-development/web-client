export interface CreateMetric {
    name: string;
    resource: string;
    monitor: string;
    metric: string;
    period: number;
    interval: number;
}
