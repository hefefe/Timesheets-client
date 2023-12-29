import { TestBed } from '@angular/core/testing';

import { PersonReportsService } from './person-reports.service';

describe('PersonReportsService', () => {
  let service: PersonReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
