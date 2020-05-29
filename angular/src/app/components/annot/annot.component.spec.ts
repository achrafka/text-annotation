import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotComponent } from './annot.component';

describe('AnnotComponent', () => {
  let component: AnnotComponent;
  let fixture: ComponentFixture<AnnotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
