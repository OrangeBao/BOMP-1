import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardScanComponent } from './dashboard-scan.component';

describe('DashboardScanComponent', () => {
  let component: DashboardScanComponent;
  let fixture: ComponentFixture<DashboardScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
