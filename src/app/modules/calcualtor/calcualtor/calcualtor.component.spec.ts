import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcualtorComponent } from './calcualtor.component';

describe('CalcualtorComponent', () => {
  let component: CalcualtorComponent;
  let fixture: ComponentFixture<CalcualtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcualtorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcualtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
