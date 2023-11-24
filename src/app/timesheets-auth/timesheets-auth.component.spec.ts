import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetsAuthComponent } from './timesheets-auth.component';

describe('TimesheetsAuthComponent', () => {
  let component: TimesheetsAuthComponent;
  let fixture: ComponentFixture<TimesheetsAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetsAuthComponent]
    });
    fixture = TestBed.createComponent(TimesheetsAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
