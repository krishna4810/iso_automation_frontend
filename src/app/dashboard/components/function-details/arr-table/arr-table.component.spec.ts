import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrTableComponent } from './arr-table.component';

describe('ArrTableComponent', () => {
  let component: ArrTableComponent;
  let fixture: ComponentFixture<ArrTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrTableComponent]
    });
    fixture = TestBed.createComponent(ArrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
