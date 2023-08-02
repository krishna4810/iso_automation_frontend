import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHiraComponent } from './add-hira.component';

describe('AddHiraComponent', () => {
  let component: AddHiraComponent;
  let fixture: ComponentFixture<AddHiraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHiraComponent]
    });
    fixture = TestBed.createComponent(AddHiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
