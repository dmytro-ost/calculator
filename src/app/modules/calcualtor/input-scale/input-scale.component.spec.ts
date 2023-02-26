import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputScaleComponent } from './input-scale.component';

describe('InputScaleComponent', () => {
  let component: InputScaleComponent;
  let fixture: ComponentFixture<InputScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
