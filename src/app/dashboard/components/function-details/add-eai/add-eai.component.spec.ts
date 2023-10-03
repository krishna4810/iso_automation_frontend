import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEaiComponent } from './add-eai.component';

describe('AddEaiComponent', () => {
  let component: AddEaiComponent;
  let fixture: ComponentFixture<AddEaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEaiComponent]
    });
    fixture = TestBed.createComponent(AddEaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
