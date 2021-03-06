import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeContainerComponent } from './iframe-container.component';

describe('IframeContainerComponent', () => {
  let component: IframeContainerComponent;
  let fixture: ComponentFixture<IframeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
