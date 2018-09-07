import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorClassesComponent } from './instructor-classes.component';

describe('InstructorClassesComponent', () => {
  let component: InstructorClassesComponent;
  let fixture: ComponentFixture<InstructorClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
