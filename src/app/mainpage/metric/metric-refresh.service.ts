import { Injectable } from "@angular/core";
import { ResultsTableComponent } from "./results-table/results-table.component";

@Injectable()
export class MetricRefreshService {
    public resultsComponent: ResultsTableComponent | null;

    refresh() {
        this.resultsComponent && this.resultsComponent.open();
    }
}