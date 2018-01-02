import { TestBed, inject } from '@angular/core/testing';

import { GrafanaService } from './grafana.service';

describe('GrafanaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrafanaService]
    });
  });

  it('should be created', inject([GrafanaService], (service: GrafanaService) => {
    expect(service).toBeTruthy();
  }));
});
