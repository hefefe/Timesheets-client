import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetsHeaderComponent } from './timesheets-header.component';

describe('TimesheetsHeaderComponent', () => {
  let component: TimesheetsHeaderComponent;
  let fixture: ComponentFixture<TimesheetsHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetsHeaderComponent]
    });
    fixture = TestBed.createComponent(TimesheetsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
