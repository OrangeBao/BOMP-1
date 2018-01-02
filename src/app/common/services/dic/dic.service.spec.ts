import { TestBed, inject } from '@angular/core/testing';

import { DicService } from './dic.service';

describe('DicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DicService]
    });
  });

  it('should be created', inject([DicService], (service: DicService) => {
    expect(service).toBeTruthy();
  }));
});
