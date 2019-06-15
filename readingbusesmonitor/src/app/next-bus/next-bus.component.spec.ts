import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextBusComponent } from './next-bus.component';

describe('NextBusComponent', () => {
  let component: NextBusComponent;
  let fixture: ComponentFixture<NextBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
