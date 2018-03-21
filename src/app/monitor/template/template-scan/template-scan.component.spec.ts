import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateScanComponent } from './template-scan.component';

describe('TemplateScanComponent', () => {
  let component: TemplateScanComponent;
  let fixture: ComponentFixture<TemplateScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
