import { TestBed } from '@angular/core/testing';

import { ComplexMetricsServiceService } from './complex-metrics-service.service';

describe('ComplexMetricsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplexMetricsServiceService = TestBed.get(ComplexMetricsServiceService);
    expect(service).toBeTruthy();
  });
});
