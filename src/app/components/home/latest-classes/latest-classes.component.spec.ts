import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestClassesComponent } from './latest-classes.component';

describe('LatestClassesComponent', () => {
  let component: LatestClassesComponent;
  let fixture: ComponentFixture<LatestClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
