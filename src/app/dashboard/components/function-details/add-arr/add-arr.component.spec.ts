import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrComponent } from './add-arr.component';

describe('AddArrComponent', () => {
  let component: AddArrComponent;
  let fixture: ComponentFixture<AddArrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArrComponent]
    });
    fixture = TestBed.createComponent(AddArrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
