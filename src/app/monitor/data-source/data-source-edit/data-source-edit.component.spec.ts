import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceCreateComponent } from './data-source-create.component';

describe('DataSourceCreateComponent', () => {
  let component: DataSourceCreateComponent;
  let fixture: ComponentFixture<DataSourceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
