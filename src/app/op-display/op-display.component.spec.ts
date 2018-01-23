import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpDisplayComponent } from './op-display.component';

describe('OpDisplayComponent', () => {
  let component: OpDisplayComponent;
  let fixture: ComponentFixture<OpDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
