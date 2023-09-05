import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFunctionDetailsComponent } from './view-function-details.component';

describe('ViewFunctionDetailsComponent', () => {
  let component: ViewFunctionDetailsComponent;
  let fixture: ComponentFixture<ViewFunctionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFunctionDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewFunctionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
