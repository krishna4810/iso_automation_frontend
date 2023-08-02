import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionDetailsComponent } from './function-details.component';

describe('FunctionDetailsComponent', () => {
  let component: FunctionDetailsComponent;
  let fixture: ComponentFixture<FunctionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionDetailsComponent]
    });
    fixture = TestBed.createComponent(FunctionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
