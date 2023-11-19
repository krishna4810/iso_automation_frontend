import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrRiskComponent } from './add-arr-risk.component';

describe('AddArrRiskComponent', () => {
  let component: AddArrRiskComponent;
  let fixture: ComponentFixture<AddArrRiskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArrRiskComponent]
    });
    fixture = TestBed.createComponent(AddArrRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
