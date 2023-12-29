import { TestBed } from '@angular/core/testing';

import { ProjectReportsService } from './project-reports.service';

describe('ProjectReportsService', () => {
  let service: ProjectReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
