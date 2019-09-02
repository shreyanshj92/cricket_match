import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecartComponent } from './scorecart.component';

describe('ScorecartComponent', () => {
  let component: ScorecartComponent;
  let fixture: ComponentFixture<ScorecartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
